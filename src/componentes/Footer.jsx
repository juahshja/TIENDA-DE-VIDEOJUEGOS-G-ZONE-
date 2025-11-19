import React, { useContext } from 'react';
import { AuthContext } from '../contexto/AuthContext';

function Footer() {
  const { abrirModalLogin } = useContext(AuthContext);

  const handleCarritoClick = (e) => {
    e.preventDefault();
    abrirModalLogin();
  };

  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Columna 1: Información de la empresa */}
          <div className="col-md-4 mb-4">
            <h5 className="text-warning mb-3">
              <i className="fas fa-gamepad me-2"></i>
              G-ZONE
            </h5>
            <p className="text-light">
              Tu tienda de videojuegos de confianza desde 2020. Ofrecemos los mejores títulos 
              para todas las plataformas a precios competitivos.
            </p>
            <div className="social-links">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="col-md-2 mb-4">
            <h6 className="text-warning mb-3">ENLACES RÁPIDOS</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">
                  <i className="fas fa-home me-1"></i> Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="/catalogo" className="text-light text-decoration-none">
                  <i className="fas fa-store me-1"></i> Catálogo
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/carrito" 
                  className="text-light text-decoration-none"
                  onClick={handleCarritoClick}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-shopping-cart me-1"></i> Carrito
                </a>
              </li>
              <li className="mb-2">
                <a href="/wishlist" className="text-light text-decoration-none">
                  <i className="fas fa-heart me-1"></i> Wishlist
                </a>
              </li>
              <li className="mb-2">
                <a href="/perfil" className="text-light text-decoration-none">
                  <i className="fas fa-user me-1"></i> Mi Perfil
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ayuda y soporte */}
          <div className="col-md-3 mb-4">
            <h6 className="text-warning mb-3">AYUDA & SOPORTE</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-question-circle me-1"></i> FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-shipping-fast me-1"></i> Envíos & Entregas
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-undo me-1"></i> Devoluciones
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-file-contract me-1"></i> Términos & Condiciones
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="fas fa-shield-alt me-1"></i> Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Métodos de pago */}
          <div className="col-md-3 mb-4">
            <h6 className="text-warning mb-3">MÉTODOS DE PAGO</h6>
            <div className="payment-methods mb-3">
              <i className="fab fa-cc-visa fa-2x text-light me-2"></i>
              <i className="fab fa-cc-mastercard fa-2x text-light me-2"></i>
              <i className="fab fa-cc-paypal fa-2x text-light me-2"></i>
              <i className="fab fa-cc-amex fa-2x text-light"></i>
            </div>
            <div className="security-badge">
              <small className="text-muted">
                <i className="fas fa-lock me-1"></i>
                Compra 100% segura
              </small>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="bg-secondary my-4" />

        {/* Copyright */}
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
            <p className="mb-0">
              © {new Date().getFullYear()} <strong className="text-warning">G-ZONE</strong> — Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end text-center">
            <small className="text-muted">
              Desarrollado con React + Vite | Tu tienda de videojuegos de confianza
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;