import { Link } from "react-router-dom";
import { useCarrito } from "../contexto/CarritoContext";
import { useAuth } from "../contexto/AuthContext";
import { useWishlist } from "../contexto/WishlistContext";
import { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";

function Navbar() {
  const { cantidadTotal } = useCarrito();
  const { isAuthenticated, user, logout, loggingOut } = useAuth(); 
  const { cantidadWishlist } = useWishlist();
  const [showLoginModal, setShowLoginModal] = useState(false);

  //INICIALIZA DROPDOWNS DE BOOTSTRAP
  useEffect(() => {
    if (isAuthenticated && typeof window !== 'undefined' && window.bootstrap) {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      [...dropdownElementList].map(dropdownToggleEl => new window.bootstrap.Dropdown(dropdownToggleEl));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    if (window.confirm('¿Cerrar sesión?')) {
      logout();
    }
  };

  const handleCarritoClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const handleWishlistClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <ModalLogin 
        show={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* MODAL DE CARGA AL CERRAR SESIÓN */}
      {loggingOut && (
        <div 
          className="modal fade show d-block" 
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-center text-white">
            <div className="spinner-border mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h4>Cerrando sesión...</h4>
          </div>
        </div>
      )}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🎮 G-Zone
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* MENÚ PRINCIPAL  */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/centro-ayuda">
                Ayuda
              </Link>
            </li>
          </ul>

          {/* CARRITO Y WISHLIST */}
          <ul className="navbar-nav ms-auto align-items-center">
            {/* CARRITO - Siempre visible */}
            <li className="nav-item me-3">
              <Link 
                className="nav-link position-relative" 
                to={isAuthenticated ? "/carrito" : "#"}
                onClick={handleCarritoClick}
                title="Carrito"
              >
                <i className="fas fa-shopping-cart fs-5"></i>
                {cantidadTotal > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidadTotal}
                  </span>
                )}
              </Link>
            </li>

            {/* WISHLIST */}
            <li className="nav-item me-3">
              <Link 
                className="nav-link position-relative" 
                to={isAuthenticated ? "/wishlist" : "#"}
                onClick={handleWishlistClick}
                title="Lista de Deseos"
              >
                <i className="fas fa-heart fs-5 text-danger"></i>
                {cantidadWishlist > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidadWishlist}
                  </span>
                )}
              </Link>
            </li>

            {/* USUARIO CON DROPDOWN */}
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle d-flex align-items-center btn btn-link text-decoration-none" 
                  id="userDropdown" 
                  type="button"
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.55)' }}
                >
                  <i className="fas fa-user-circle me-2"></i>
                  <span>{user?.nombre}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="fas fa-user me-2"></i>
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/carrito">
                      <i className="fas fa-shopping-bag me-2"></i>
                      Mis Compras
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                {/* Divisor visual */}
                <li className="nav-item">
                  <span className="nav-link text-muted">|</span>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Iniciar Sesión
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light btn-sm ms-2 px-3" to="/registro">
                    <i className="fas fa-user-plus me-1"></i>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;