import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCarrito } from '../contexto/CarritoContext';
import { obtenerJuegoPorId } from '../servicios/juegosService';

function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();
  const [juego, setJuego] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);
        setError(null);
        const datos = await obtenerJuegoPorId(id);
        setJuego(datos);
      } catch (err) {
        setError('Producto no encontrado');
        console.error('Error cargando producto:', err);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      cargarProducto();
    }
  }, [id]);

  const handleAgregarCarrito = () => {
    if (juego) {
      agregarAlCarrito(juego);
      alert(`¡${juego.nombre} agregado al carrito!`);
    }
  };

  if (cargando) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  if (error || !juego) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Producto no encontrado</h4>
          <p>El juego que buscas no existe o fue removido.</p>
          <Link to="/catalogo" className="btn btn-primary">
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/catalogo" className="text-decoration-none">Catálogo</Link>
          </li>
          <li className="breadcrumb-item active">{juego.nombre}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="product-image-detalle text-center">
            <img 
              src={juego.imagen} 
              alt={juego.nombre}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="product-info">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="badge bg-primary fs-6">{juego.categoria}</span>
              <span className="badge bg-secondary fs-6">{juego.plataforma}</span>
            </div>
            
            <h1 className="product-title-detalle mb-3">{juego.nombre}</h1>
            
            <div className="product-description-detalle mb-4">
              <h5 className="text-dark mb-3">Descripción</h5>
              <p className="fs-6 text-muted">{juego.descripcion}</p>
            </div>

            <div className="product-pricing bg-light rounded p-4 mb-4">
              <div className="price-section text-center mb-4">
                <span className="display-4 text-primary fw-bold">${juego.precio}</span>
              </div>

              <div className="product-actions-detalle d-grid gap-2">
                <button 
                  className="btn btn-primary btn-lg py-3 fw-bold"
                  onClick={handleAgregarCarrito}
                >
                  🛒 Agregar al Carrito
                </button>
                <button 
                  className="btn btn-outline-secondary btn-lg py-3"
                  onClick={() => navigate('/catalogo')}
                >
                  ← Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;