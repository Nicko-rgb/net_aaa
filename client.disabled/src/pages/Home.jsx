import React, { useState, useEffect } from 'react';
import foto1 from '../assets/foto2.jpg';
import '../styles/home.css';
import Login from '../components/Login/Login';
import Registro from '../components/Login/Registro';

const Home = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [fallingImages, setFallingImages] = useState([]);

    const movieImages = [
        'https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
        'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
        'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
        'https://image.tmdb.org/t/p/w500/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg',
        'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
        'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
        'https://image.tmdb.org/t/p/w500/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
        'https://image.tmdb.org/t/p/w500/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
        'https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
        'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
        'https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
        'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
        'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
        'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
        'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
        'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        'https://image.tmdb.org/t/p/w500/hEpWvX6fXrJfQnEZuicoDbHb8Gd.jpg',
        'https://image.tmdb.org/t/p/w500/hEpWvX6fXrJfQnEZuicoDbHb8Gd.jpg'
    ];

    // Generar imágenes que caen con posiciones y rotaciones aleatorias
    useEffect(() => {
        const generateFallingImages = () => {
            const images = [];
            for (let i = 0; i < 15; i++) {
                const randomImage = movieImages[Math.floor(Math.random() * movieImages.length)];
                const randomLeft = Math.random() * 100; // Posición horizontal aleatoria (0-100%)
                const randomRotation = (Math.random() - 0.5) * 90; // Rotación aleatoria (-45 a 45 grados)
                const randomDelay = Math.random() * 5; // Delay aleatorio para que no caigan todas al mismo tiempo
                const randomDuration = 8 + Math.random() * 4; // Duración de caída aleatoria (8-12s)
                
                images.push({
                    id: i,
                    src: randomImage,
                    left: randomLeft,
                    rotation: randomRotation,
                    delay: randomDelay,
                    duration: randomDuration
                });
            }
            setFallingImages(images);
        };

        generateFallingImages();
    }, []);

    return (
        <div className='home'>

            <div className="container">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/PE-es-20250721-TRIFECTA-perspective_ba6f982a-75da-4a8a-9867-e90fd7327e36_large.jpg" alt="" />
                
                {/* Lluvia de imágenes */}
                <div className="falling-images">
                    {fallingImages.map((image) => (
                        <img
                            key={image.id}
                            src={image.src}
                            alt="Falling movie poster"
                            className="falling-image"
                            style={{
                                left: `${image.left}%`,
                                transform: `rotate(${image.rotation}deg)`,
                                animationDelay: `${image.delay}s`,
                                animationDuration: `${image.duration}s`
                            }}
                        />
                    ))}
                </div>
                
                <div className="auth-components">
                    {showLogin ? 
                        <Login onToggleView={() => setShowLogin(false)} /> : 
                        <Registro onToggleView={() => setShowLogin(true)} />
                    }
                </div>
            </div>

            <section className="features-section">
                <h2>Más motivos para unirte</h2>
                <aside className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV" />
                        </div>
                        <h3>Disfruta en tu TV</h3>
                        <p>Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Download" />
                        </div>
                        <h3>Descarga tus series para verlas offline</h3>
                        <p>Guarda tu contenido favorito y siempre tendrás algo para ver.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="Devices" />
                        </div>
                        <h3>Disfruta donde quieras</h3>
                        <p>Películas y series ilimitadas en tu teléfono, tablet, laptop y TV.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d" alt="Kids" />
                        </div>
                        <h3>Crea perfiles para niños</h3>
                        <p>Los niños vivirán aventuras con sus personajes favoritos en un espacio diseñado exclusivamente para ellos, gratis con tu membresía.</p>
                    </div>
                </aside>
            </section>

            <section className='section'>
                <div>
                    <h2>Disfruta en tu TV</h2>
                    <p>Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.</p>
                </div>
                <img src={foto1} alt="" />
            </section>

            <section className='section'>
                <img style={{maxWidth: 300}} src="https://i.pinimg.com/736x/af/97/99/af9799806e7ce213fd48cfae7dd383bb.jpg" alt="" />
                <div>
                    <h2>Descarga tus programas para verlos sin conexión</h2>
                    <p>Guarda tus programas favoritos y los que quieras ver más tarde.</p>
                </div>
            </section>

            <footer className="footer-section">
                <div className="footer-content">
                    <div className="footer-signup">
                        <h2>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</h2>
                        <div className="email-signup">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="email-input"
                            />
                            <button className="get-started-btn">
                                Comenzar
                                <svg viewBox="0 0 24 24" className="arrow-icon">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="footer-info">
                        <p>¿Preguntas? Llama al <a href="tel:0800558821">0 800 55821</a></p>
                        
                        <div className="footer-links">
                            <div className="link-column">
                                <a href="#">Preguntas frecuentes</a>
                                <a href="#">Relaciones con inversionistas</a>
                                <a href="#">Formas de ver</a>
                                <a href="#">Información corporativa</a>
                                <a href="#">Solo en Netflix</a>
                            </div>
                            <div className="link-column">
                                <a href="#">Centro de ayuda</a>
                                <a href="#">Empleo</a>
                                <a href="#">Términos de uso</a>
                                <a href="#">Contáctanos</a>
                            </div>
                            <div className="link-column">
                                <a href="#">Cuenta</a>
                                <a href="#">Canjear tarjetas de regalo</a>
                                <a href="#">Privacidad</a>
                                <a href="#">Prueba de velocidad</a>
                            </div>
                            <div className="link-column">
                                <a href="#">Prensa</a>
                                <a href="#">Comprar tarjetas de regalo</a>
                                <a href="#">Preferencias de cookies</a>
                                <a href="#">Avisos legales</a>
                            </div>
                        </div>
                        
                        <div className="language-selector">
                            <select>
                                <option value="es">🌐 Español</option>
                                <option value="en">🌐 English</option>
                            </select>
                        </div>
                        
                        <p className="netflix-country">NetFox Perú</p>
                        
                        <p className="recaptcha-notice">
                            Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot. 
                            <a href="#"> Más info.</a>
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Home