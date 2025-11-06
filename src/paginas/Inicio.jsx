import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section text-center text-white mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Bienvenido a G-Zone</h1>
          <p className="lead mb-4">
            Descubre los mejores videojuegos para todas las plataformas
          </p>
          <Link to="/catalogo" className="btn btn-light btn-lg">
            Explorar Catálogo
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="row text-center mb-5">
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>🎮 Amplia Variedad</h3>
              <p>Juegos para PS5, Xbox, Nintendo Switch y PC</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>💰 Mejores Precios</h3>
              <p>Ofertas exclusivas y precios competitivos</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>🚚 Envío Rápido</h3>
              <p>Recibe tus juegos en la puerta de tu casa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;