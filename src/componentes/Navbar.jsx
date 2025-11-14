import { Link } from "react-router-dom";
import { useCarrito } from "../contexto/CarritoContext";

function Navbar() {
  const { cantidadTotal } = useCarrito();

  return (
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
          {/* AGREGAR ESTE NUEVO ITEM */}
          <li className="nav-item">
            <Link className="nav-link" to="/centro-ayuda">
              Centro de Ayuda
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link position-relative" to="/carrito">
              Carrito 🛒
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