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
  const [cantidad, setCantidad] = useState(1);

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
      for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(juego);
      }
    }
  };

  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(calificacion)) {
        estrellas.push(<span key={i} className="text-warning">⭐</span>);
      } else if (i === Math.ceil(calificacion) && !Number.isInteger(calificacion)) {
        estrellas.push(<span key={i} className="text-warning">⭐</span>);
      } else {
        estrellas.push(<span key={i} className="text-secondary">☆</span>);
      }
    }
    return estrellas;
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
      {/* Migas de pan */}
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
        {/* Columna Imagen */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <img 
              src={juego.imagen} 
              alt={juego.nombre}
              className="card-img-top"
              style={{ height: '400px', objectFit: 'contain', padding: '1rem' }}
            />
          </div>
        </div>

        {/* Columna Información */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* Categoría y Plataformas */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="badge bg-primary">{juego.categoria}</span>
                <div>
                  {juego.plataformas && juego.plataformas.map((plat, index) => (
                    <span key={index} className="badge bg-secondary me-1">{plat}</span>
                  ))}
                </div>
              </div>
              
              {/* Título */}
              <h1 className="card-title h3 mb-3">{juego.nombre}</h1>
              
              {/* Calificación */}
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  {renderEstrellas(juego.calificacion || 4)}
                  <span className="ms-2 text-muted">
                    ({juego.calificacion || 4}/5) - {juego.reseñas || 0} reseñas
                  </span>
                </div>
              </div>

              {/* Precio */}
              <div className="mb-4">
                <h2 className="text-primary mb-0">${juego.precio}</h2>
                <small className="text-muted">Precio final</small>
              </div>

              {/* Disponibilidad */}
              <div className="mb-3">
                <span className={`badge ${juego.disponibilidad === 'En stock' ? 'bg-success' : 'bg-danger'}`}>
                  {juego.disponibilidad || 'En stock'}
                </span>
                {juego.stock && (
                  <small className="text-muted ms-2">
                    {juego.stock} unidades disponibles
                  </small>
                )}
              </div>

              {/* Selector de Cantidad */}
              <div className="mb-4">
                <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                <div className="d-flex align-items-center">
                  <select 
                    id="cantidad"
                    className="form-select me-3" 
                    style={{ width: '80px' }}
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <span className="text-muted small">
                    Máximo 5 unidades por pedido
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="d-grid gap-2 mb-4">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleAgregarCarrito}
                  disabled={juego.disponibilidad === 'Agotado'}
                >
                  {juego.disponibilidad === 'Agotado' ? 'PRODUCTO AGOTADO' : '🛒 Agregar al Carrito'}
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/catalogo')}
                >
                  ← Seguir Comprando
                </button>
              </div>

              {/* Información Adicional */}
              <div className="border-top pt-3">
                <div className="row small text-muted">
                  <div className="col-6">
                    <strong>Desarrollador:</strong><br />
                    {juego.desarrollador || 'No especificado'}
                  </div>
                  <div className="col-6">
                    <strong>Lanzamiento:</strong><br />
                    {juego.lanzamiento || 'No especificado'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción Completa */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Descripción del Juego</h5>
              <p className="card-text">
                {juego.descripcionCompleta || juego.descripcion}
              </p>
              
              {/* Características */}
              {juego.caracteristicas && juego.caracteristicas.length > 0 && (
                <>
                  <h6 className="mt-4">Características Principales</h6>
                  <div className="row">
                    {juego.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="col-md-6">
                        <span className="text-primary">•</span> {caracteristica}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;