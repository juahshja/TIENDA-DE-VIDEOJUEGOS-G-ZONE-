import { Link } from "react-router-dom";
import { useCarrito } from "../contexto/CarritoContext";

function Navbar() {
  const { cantidadTotal } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Link className="navbar-brand fw-bold fs-3" to="/">
        <i className="fas fa-gamepad me-2"></i>
        G-Zone
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
              <i className="fas fa-home me-1"></i>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/catalogo">
              <i className="fas fa-th-list me-1"></i>
              Catálogo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/centro-ayuda">
              <i className="fas fa-headset me-1"></i>
              Centro de Ayuda
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link position-relative" to="/carrito">
              <i className="fas fa-shopping-cart me-1"></i>
              Tus Compras
              {cantidadTotal > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadTotal}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;