import { Link } from "react-router-dom";
import { useCarrito } from "../contexto/CarritoContext";
import { useAuth } from "../contexto/AuthContext";
import { useWishlist } from "../contexto/WishlistContext";
import { useState } from "react"; // ✅ AGREGAR
import ModalLogin from "./ModalLogin"; // ✅ AGREGAR

function Navbar() {
  const { cantidadTotal } = useCarrito();
  const { isAuthenticated, user, logout } = useAuth();
  const { cantidadWishlist } = useWishlist();
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ AGREGAR

  const handleLogout = () => {
    if (window.confirm('¿Cerrar sesión?')) {
      logout();
    }
  };

  // ✅ FUNCIÓN NUEVA: Manejar click en "Tus Compras"
  const handleTusComprasClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Evitar navegación
      setShowLoginModal(true); // Mostrar modal
    }
    // Si está autenticado, el Link funciona normal
  };

  return (
    <>
      {/* ✅ MODAL DE LOGIN */}
      <ModalLogin 
        show={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

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
          <ul className="navbar-nav ms-auto">
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
                Centro de Ayuda
              </Link>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/wishlist">
                  <i className="fas fa-heart text-danger"></i> Lista de Deseos
                  {cantidadWishlist > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cantidadWishlist}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* ✅ MODIFICADO: "Tus Compras" con protección */}
            <li className="nav-item">
              <Link 
                className="nav-link position-relative" 
                to={isAuthenticated ? "/carrito" : "#"} 
                onClick={handleTusComprasClick} // ✅ AGREGAR onClick
              >
                Tus Compras
                {cantidadTotal > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidadTotal}
                  </span>
                )}
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfil">
                    <i className="fas fa-user-circle"></i> {user?.nombre}
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">
                    <i className="fas fa-user-plus"></i> Registrarse
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