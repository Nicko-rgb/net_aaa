// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7001;
const JWT_SECRET = process.env.JWT_SECRET || 'netfox_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos (desde .env)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'netfox',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

// Verificar conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err);
    return;
  }
  console.log('✅ Conexión a la base de datos MySQL establecida.');
  connection.release();
});

// Crear tabla password_resets si no existe (mantiene tu esquema)
const createResetsTable = `
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    email VARCHAR(255) NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

promisePool.query(createResetsTable).catch(err => {
  console.error('Error creando tabla password_resets:', err);
});

// ------------------------------
// RUTAS DE AUTENTICACIÓN (register/login)
// ------------------------------

// Registro
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Todos los campos son requeridos' });

  try {
    const [existing] = await promisePool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await promisePool.query('INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())', [name, email, hashedPassword]);

    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: result.insertId, name, email } });
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email y contraseña son requeridos' });

  try {
    const [users] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Middleware JWT (si más adelante lo usas)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};

// ------------------------------
// RECUPERACIÓN DE CONTRASEÑA (OTP)
// ------------------------------

// Crea transporter priorizando Gmail (EMAIL_USER + EMAIL_PASS en .env), fallback a Ethereal
async function createTransporter() {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Gmail usando App Password
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // <- solo para desarrollo local (evita self-signed error)
      },
    });
  }

  // Fallback (dev): Ethereal
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
}

// Solicitar OTP (no revelar si email existe o no)
app.post('/api/auth/request-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requerido' });

  try {
    // Buscar usuario (si existe) para relacionar user_id (opcional)
    const [users] = await promisePool.query('SELECT id FROM users WHERE email = ?', [email]);
    const user = users[0] || null;

    // Generar OTP y hash
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    const userId = user ? user.id : null;
    await promisePool.query(
      'INSERT INTO password_resets (user_id, email, otp_hash, expires_at, used) VALUES (?, ?, ?, ?, 0)',
      [userId, email, otpHash, expiresAt]
    );

    const transporter = await createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || `no-reply@${process.env.EMAIL_USER || 'netfox.test'}`,
      to: email,
      subject: 'Tu código de recuperación - Netfox',
      text: `Tu código de recuperación es: ${otp}. Expira en 15 minutos.`,
      html: `
        <div style="font-family: Arial, sans-serif; text-align:center;">
          <h2>Recuperación de cuenta Netfox</h2>
          <p>Tu código de verificación es:</p>
          <h1 style="color:#007bff;">${otp}</h1>
          <p>Este código expirará en 15 minutos.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP enviado (messageId):', info.messageId);

    // Si Ethereal, mostrar preview URL en logs (útil para dev)
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) console.log('Preview OTP email (Ethereal):', previewUrl);

    // Responder siempre con éxito para no revelar existencia del email
    res.json({ success: true, message: 'Si el email existe, se ha enviado un código.' });
  } catch (err) {
    console.error('Error en request-otp:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Verificar OTP y cambiar contraseña
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) return res.status(400).json({ message: 'Email, código y nueva contraseña requeridos' });

  try {
    // Obtener el último OTP no usado para ese email
    const [rows] = await promisePool.query(
      'SELECT * FROM password_resets WHERE email = ? AND used = 0 ORDER BY created_at DESC LIMIT 1',
      [email]
    );

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: 'Código inválido o expirado' });
    }

    const reset = rows[0];
    const now = new Date();
    if (new Date(reset.expires_at) < now) {
      return res.status(400).json({ message: 'Código expirado' });
    }

    // Comparar OTP (recuerda que guardamos hash)
    const match = await bcrypt.compare(otp, reset.otp_hash);
    if (!match) return res.status(400).json({ message: 'Código incorrecto' });

    // Valid OTP -> actualizar contraseña del usuario si existe
    // Primero intentamos por user_id
    if (reset.user_id) {
      const newHashed = await bcrypt.hash(password, 10);
      await promisePool.query('UPDATE users SET password = ? WHERE id = ?', [newHashed, reset.user_id]);
    } else {
      // Si no hay user_id, intentar buscar por email y actualizar
      const [users] = await promisePool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (users && users.length > 0) {
        const newHashed = await bcrypt.hash(password, 10);
        await promisePool.query('UPDATE users SET password = ? WHERE id = ?', [newHashed, users[0].id]);
      } else {
        // No existe usuario con ese email (aun así marcamos el OTP como usado y devolvemos éxito)
        console.warn('verify-otp: no se encontró usuario para el email:', email);
      }
    }

    // Marcar OTP como usado
    await promisePool.query('UPDATE password_resets SET used = 1 WHERE id = ?', [reset.id]);

    res.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error('Error en verify-otp:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// ------------------------------
// INICIO DEL SERVIDOR
// ------------------------------
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en http://192.168.18.22:${port}`);
  console.log('Escuchando en todas las interfaces de red (para Expo Go)');
});
