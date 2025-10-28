const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 7001;
const JWT_SECRET = process.env.JWT_SECRET || 'netfox_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'netfox',
};

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig);

// Configuración del transporter de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verificar la configuración del email
transporter.verify((error, success) => {
    if (error) {
        console.error('Error en la configuración del email:', error);
    } else {
        console.log('Servidor de email configurado correctamente');
    }
});

// Verificar la conexión a la base de datos al iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
    connection.release();
});

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Ruta de registro
app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    try {
        // Verificar si el usuario ya existe
        pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }
            
            if (results.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }
            
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Insertar nuevo usuario
            pool.query(
                'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())',
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al crear usuario' });
                    }
                    
                    const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: '24h' });
                    res.status(201).json({
                        message: 'Usuario creado exitosamente',
                        token,
                        user: { id: result.insertId, name, email }
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta de login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
        
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('🔴 Error en consulta DB:', err);
            return res.status(500).json({ message: 'Error del servidor' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        const user = results[0];
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({
            message: 'Login exitoso',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
});

// Obtener todos los videos de la base de datos
app.get('/api/videos', (req, res) => {
    pool.query('SELECT id_video as id, titulo as title, genero as category, anio as year, imagen as image, url as videoUrl, descripcion as description FROM videos ORDER BY RAND()', (err, results) => {
        if (err) {
            console.error('Error al obtener videos:', err);
            return res.status(500).json({ message: 'Error del servidor' });
        }
        res.json(results);
    });
});

// Buscar videos por título
app.get('/api/videos/search', verifyToken, (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return pool.query('SELECT id_video as id, titulo as title, genero as category, anio as year, imagen as image, url as videoUrl, descripcion as description FROM videos ORDER BY id_video DESC', (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }
            res.json(results);
        });
    }
    
    pool.query(
        'SELECT id_video as id, titulo as title, genero as category, anio as year, imagen as image, url as videoUrl, descripcion as description FROM videos WHERE titulo LIKE ? ORDER BY id_video DESC',
        [`%${q}%`],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }
            res.json(results);
        }
    );
});

// Obtener videos por categoría
app.get('/api/videos/category/:category', verifyToken, (req, res) => {
    const { category } = req.params;
    
    pool.query(
        'SELECT id_video as id, titulo as title, genero as category, anio as year, imagen as image, url as videoUrl, descripcion as description FROM videos WHERE genero = ? ORDER BY id_video DESC',
        [category],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }
            res.json(results);
        }
    );
});

// Obtener categorías de videos disponibles (6 aleatorias)
app.get('/api/videos/categories', verifyToken, (req, res) => {
    pool.query('SELECT DISTINCT genero as category FROM videos WHERE genero IS NOT NULL ORDER BY RAND() LIMIT 10', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
            }
        const categories = results.map(row => row.category);
        res.json(categories);
    });
});

// Obtener video destacado (el más reciente)
app.get('/api/videos/featured', verifyToken, (req, res) => {
    pool.query('SELECT id_video as id, titulo as title, genero as category, anio as year, imagen as image, url as videoUrl, descripcion as description FROM videos ORDER BY id_video DESC LIMIT 1', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No hay videos disponibles' });
        }
        res.json(results[0]);
    });
});

// Obtener 5 videos aleatorios para el banner
app.get('/api/videos/banner', verifyToken, (req, res) => {
    pool.query('SELECT id_video as id, titulo as title, genero as category, anio as year, imagen as image, url as videoUrl, descripcion as description FROM videos ORDER BY RAND() LIMIT 5', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No hay videos disponibles' });
        }
        res.json(results);
    });
});

// Verificar token
app.get('/api/verify', verifyToken, (req, res) => {
    pool.query('SELECT id, name, email FROM users WHERE id = ?', [req.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json({
            success: true,
            user: results[0]
        });
    });
});

// ===== RUTAS DE FAVORITOS =====

// Agregar video a favoritos
app.post('/api/favorites', verifyToken, (req, res) => {
    const { videoId } = req.body;
    const userId = req.userId;
    
    if (!videoId) {
        return res.status(400).json({ message: 'ID del video es requerido' });
    }
    
    pool.query(
        'INSERT INTO favorites (user_id, video_id) VALUES (?, ?)',
        [userId, videoId],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'El video ya está en favoritos' });
                }
                return res.status(500).json({ message: 'Error al agregar a favoritos' });
            }
            res.status(201).json({ message: 'Video agregado a favoritos' });
        }
    );
});

// Quitar video de favoritos
app.delete('/api/favorites/:videoId', verifyToken, (req, res) => {
    const { videoId } = req.params;
    const userId = req.userId;
    
    pool.query(
        'DELETE FROM favorites WHERE user_id = ? AND video_id = ?',
        [userId, videoId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al quitar de favoritos' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Favorito no encontrado' });
            }
            res.json({ message: 'Video quitado de favoritos' });
        }
    );
});

// Obtener favoritos del usuario
app.get('/api/favorites', verifyToken, (req, res) => {
    const userId = req.userId;
    
    pool.query(
        `SELECT v.id_video as id, v.titulo as title, v.genero as category, 
         v.anio as year, v.imagen as image, v.url as videoUrl, 
         v.descripcion as description, f.created_at as favorited_at
         FROM favorites f 
         JOIN videos v ON f.video_id = v.id_video 
         WHERE f.user_id = ? 
         ORDER BY f.created_at DESC`,
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener favoritos' });
            }
            res.json(results);
        }
    );
});

// Verificar si un video está en favoritos
app.get('/api/favorites/check/:videoId', verifyToken, (req, res) => {
    const { videoId } = req.params;
    const userId = req.userId;
    
    pool.query(
        'SELECT id FROM favorites WHERE user_id = ? AND video_id = ?',
        [userId, videoId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error al verificar favorito' });
            }
            res.json({ isFavorite: results.length > 0 });
        }
    );
});

// ===== RUTAS DE HISTORIAL =====

// Agregar video al historial
app.post('/api/history', verifyToken, (req, res) => {
    const { videoId } = req.body;
    const userId = req.userId;
    
    if (!videoId) {
        return res.status(400).json({ message: 'ID del video es requerido' });
    }
    
    // Verificar si el video ya existe en el historial del usuario
    pool.query(
        'SELECT id FROM watch_history WHERE user_id = ? AND video_id = ?',
        [userId, videoId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error al verificar historial' });
            }
            
            // Si ya existe, no insertar duplicado
            if (results.length > 0) {
                return res.status(200).json({ message: 'Video ya existe en el historial' });
            }
            
            // Si no existe, insertar en el historial
            pool.query(
                'INSERT INTO watch_history (user_id, video_id) VALUES (?, ?)',
                [userId, videoId],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al agregar al historial' });
                    }
                    res.status(201).json({ message: 'Video agregado al historial' });
                }
            );
        }
    );
});

// Obtener historial del usuario
app.get('/api/history', verifyToken, (req, res) => {
    const userId = req.userId;
    
    pool.query(
        `SELECT v.id_video as id, v.titulo as title, v.genero as category, 
         v.anio as year, v.imagen as image, v.url as videoUrl, 
         v.descripcion as description, h.watched_at
         FROM watch_history h 
         JOIN videos v ON h.video_id = v.id_video 
         WHERE h.user_id = ? 
         ORDER BY h.watched_at DESC`,
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener historial' });
            }
            res.json(results);
        }
    );
});

// Limpiar historial del usuario
app.delete('/api/history', verifyToken, (req, res) => {
    const userId = req.userId;
    
    pool.query(
        'DELETE FROM watch_history WHERE user_id = ?',
        [userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al limpiar historial' });
            }
            res.json({ message: 'Historial limpiado exitosamente' });
        }
    );
});

// ===== RUTAS DE RECUPERACIÓN DE CONTRASEÑA =====

// Generar código OTP de 6 dígitos
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Enviar código de recuperación
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'El email es requerido' });
    }
    
    // Verificar si el usuario existe
    pool.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'No existe una cuenta con este email' });
        }
        
        // Generar código OTP
        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
        
        // Limpiar códigos OTP anteriores para este email
        pool.query('DELETE FROM password_reset_otps WHERE email = ?', [email], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }
            
            // Insertar nuevo código OTP
            pool.query(
                'INSERT INTO password_reset_otps (email, otp_code, expires_at) VALUES (?, ?, ?)',
                [email, otpCode, expiresAt],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al generar código' });
                    }
                    
                    // Enviar email con el código OTP
                    const mailOptions = {
                        from: process.env.EMAIL_FROM,
                        to: email,
                        subject: 'Código de recuperación de contraseña - Netfox',
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #e50914;">Netfox - Recuperación de Contraseña</h2>
                                <p>Hola,</p>
                                <p>Has solicitado recuperar tu contraseña. Usa el siguiente código de verificación:</p>
                                <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                                    <h1 style="color: #e50914; font-size: 32px; margin: 0; letter-spacing: 5px;">${otpCode}</h1>
                                </div>
                                <p><strong>Este código expira en 15 minutos.</strong></p>
                                <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
                                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                                <p style="color: #666; font-size: 12px;">
                                    Este es un email automático, por favor no respondas a este mensaje.
                                </p>
                            </div>
                        `
                    };
                    
                    transporter.sendMail(mailOptions, (emailErr, info) => {
                        if (emailErr) {
                            console.error('Error enviando email:', emailErr);
                            // Aún así respondemos exitosamente para no revelar errores internos
                        } else {
                            console.log('Email enviado:', info.response);
                        }
                        
                        res.json({ 
                            message: 'Código de verificación enviado a tu email',
                            // En desarrollo, devolvemos el código para pruebas
                            ...(process.env.NODE_ENV === 'development' && { otpCode })
                        });
                    });
                }
            );
        });
    });
});

// Verificar código OTP y cambiar contraseña
app.post('/api/verify-otp', async (req, res) => {
    const { email, otpCode, newPassword } = req.body;
    
    if (!email || !otpCode || !newPassword) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    // Verificar código OTP
    pool.query(
        'SELECT * FROM password_reset_otps WHERE email = ? AND otp_code = ? AND used = FALSE AND expires_at > NOW()',
        [email, otpCode],
        async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }
            
            if (results.length === 0) {
                return res.status(400).json({ message: 'Código inválido o expirado' });
            }
            
            try {
                // Encriptar nueva contraseña
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                
                // Actualizar contraseña del usuario
                pool.query(
                    'UPDATE users SET password = ? WHERE email = ?',
                    [hashedPassword, email],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error al actualizar contraseña' });
                        }
                        
                        // Marcar código OTP como usado
                        pool.query(
                            'UPDATE password_reset_otps SET used = TRUE WHERE email = ? AND otp_code = ?',
                            [email, otpCode],
                            (err) => {
                                if (err) {
                                    console.error('Error al marcar OTP como usado:', err);
                                }
                                
                                res.json({ message: 'Contraseña actualizada exitosamente' });
                            }
                        );
                    }
                );
            } catch (error) {
                return res.status(500).json({ message: 'Error al procesar la contraseña' });
            }
        }
    );
});

// Iniccializamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});