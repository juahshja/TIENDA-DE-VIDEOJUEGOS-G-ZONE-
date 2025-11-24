import { useCarrito } from "../contexto/CarritoContext";
import { useAuth } from "../contexto/AuthContext";
import { useState } from "react"; 
import { Link } from "react-router-dom";
import BotonWishlist from "./BotonWishlist";
import ModalLogin from "./ModalLogin"; 

function JuegoCard({ juego }) {
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth(); 
  const [showLoginModal, setShowLoginModal] = useState(false); 

  //  agregar al carrito con verificación
  const handleAgregarCarritoProtegido = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowLoginModal(true); // Mostrar modal si no está logueado
      return; // No agregar al carrito
    }
    
    // Si está logueado, agregar normalmente
    agregarAlCarrito(juego);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      {/* MODAL DE LOGIN */}
      <ModalLogin 
        show={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      <div className="card h-100 juego-card shadow-sm border-0">
        <Link 
          to={`/producto/${juego.id}`} 
          className="text-decoration-none text-dark"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <div className="card-img-container position-relative">
            <img
              src={juego.imagen}
              className="card-img-top"
              alt={juego.nombre}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-dark bg-opacity-75">
                {juego.plataforma}
              </span>
            </div>
          </div>

          <div className="card-body d-flex flex-column p-3">
            <h5 className="card-title fw-bold mb-2" style={{ fontSize: '1.1rem' }}>
              {juego.nombre}
            </h5>
            
            <p className="card-text text-muted small mb-3 flex-grow-1">
              {juego.descripcion}
            </p>
          </div>
        </Link>

        <div className="card-footer border-0 bg-white pt-0">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="h5 text-primary fw-bold mb-0">${juego.precio}</span>
            </div>
            <div className="d-flex gap-2">
              {/* Botón de Wishlist */}
              <BotonWishlist juego={juego} />
              
              <Link 
                to={`/producto/${juego.id}`}
                className="btn btn-outline-primary btn-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Ver Detalles
              </Link>
              
              {}
              <button
                className="btn btn-primary btn-sm"
                onClick={handleAgregarCarritoProtegido} 
              >
             <i className="fas fa-shopping-cart me-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuegoCard;