import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Filosofía&Co</h3>
                    <p>Explorando el pensamiento crítico y la cultura contemporánea.</p>
                </div>
                <div className="footer-section">
                    <h4>Navegación</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/revista">Revista</Link></li>
                        <li><Link to="/filosofia">Filosofía</Link></li>
                        <li><Link to="/portal">Portal</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><Link to="/privacy">Privacidad</Link></li>
                        <li><Link to="/terms">Términos</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {year} Filosofía&Co. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
