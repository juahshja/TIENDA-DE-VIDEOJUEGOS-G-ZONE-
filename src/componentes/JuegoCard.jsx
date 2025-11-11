import { useCarrito } from "../contexto/CarritoContext";
import { Link } from "react-router-dom"; // ← NUEVO IMPORT

function JuegoCard({ juego }) {
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarCarrito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    agregarAlCarrito(juego);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      {/* NUEVO: ENVOLVER TODA LA CARD CON LINK */}
      <Link 
        to={`/producto/${juego.id}`} 
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 juego-card shadow-sm">
          <img
            src={juego.imagen}
            className="card-img-top"
            alt={juego.nombre}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{juego.nombre}</h5>
            <p className="card-text text-muted small mb-2">
              {juego.categoria} • {juego.plataforma}
            </p>
            <p className="card-text small flex-grow-1">
              {juego.descripcion}
            </p>
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 text-primary mb-0">${juego.precio}</span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAgregarCarrito} // ← NUEVO: MANEJADOR ACTUALIZADO
                >
                  Agregar 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JuegoCard;