import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCarrito } from '../contexto/CarritoContext';
import { obtenerJuegoPorId } from '../servicios/juegosService';
import MiniCarrusel from '../componentes/MiniCarrusel';


function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();
  const [juego, setJuego] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [pestañaActiva, setPestañaActiva] = useState('detalles'); // ← AÑADE ESTA LÍNEA


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
        {/* Columna Imagen - CON MINI CARRUSEL */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 bg-transparent">
            <div className="card-body p-0">
              <MiniCarrusel 
                imagenes={juego.imagenes || [juego.imagen]} 
              />
            </div>
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

           {}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              
              {}
              <nav>
                <div className="nav nav-tabs mb-4" id="nav-tab" role="tablist">
                  <button 
                    className={`nav-link ${pestañaActiva === 'detalles' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('detalles')}
                  >
                    DETALLES
                  </button>
                  <button 
                    className={`nav-link ${pestañaActiva === 'informacion' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('informacion')}
                  >
                    MÁS INFORMACIÓN
                  </button>
                  <button 
                    className={`nav-link ${pestañaActiva === 'reseñas' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('reseñas')}
                  >
                    RESEÑAS
                  </button>
                  <button 
                    className={`nav-link ${pestañaActiva === 'relacionados' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('relacionados')}
                  >
                   RELATED POSTS
                  </button>
                </div>
              </nav>

              {/* CONTENIDO DE PESTAÑAS */}
              <div className="tab-content">
                
                {/* PESTAÑA DETALLES */}
                {pestañaActiva === 'detalles' && (
                  <div className="tab-pane fade show active">
                    <div className="row">
                      <div className="col-lg-8">
                        <h5 className="mb-3">Descripción Completa</h5>
                        <p className="card-text" style={{ lineHeight: '1.8' }}>
                          {juego.descripcionCompleta || juego.descripcion}
                        </p>
                        
                       {/* Video dinámico por juego - VERSIÓN FUNCIONAL */}
 <div className="mt-4">
  <h6>🎥 Tráiler Oficial</h6>
  
  <div className="ratio ratio-16x9 mt-2">
    {juego.video ? (
      <iframe 
        src={`https://www.youtube-nocookie.com/embed/${juego.video}?rel=0&modestbranding=1`}
        title={`Tráiler oficial de ${juego.nombre}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 'none', borderRadius: '8px' }}
      ></iframe>
    ) : (
      <div className="bg-light d-flex flex-column justify-content-center align-items-center rounded">
        <div className="h1 text-muted mb-2">🎮</div>
        <p className="text-muted text-center mb-0">
          Tráiler no disponible<br />
          <small>Próximamente...</small>
        </p>
      </div>
    )}
  </div>
  
  <small className="text-muted">
    Tráiler oficial de {juego.nombre}
  </small>
</div>
                      </div>
                      
                      <div className="col-lg-4">
                        {/* Información adicional */}
                        <div className="card border-0 bg-light">
                          <div className="card-body">
                            <h6 className="card-title">📦 {juego.nombre} - Launcher</h6>
                            <div className="d-grid gap-2 mb-3">
                              <button className="btn btn-outline-primary btn-sm">
                                Ver más trailers...
                              </button>
                              <button className="btn btn-outline-secondary btn-sm">
                                Compartir
                              </button>
                            </div>
                            
                            <hr />
                            
                            <h6 className="mt-3">🚀 Características Extendidas</h6>
                            <ul className="list-unstyled small">
                              <li>✅ Multijugador online/offline</li>
                              <li>✅ Personalización de vehículos</li>
                              <li>✅ Múltiples dimensiones</li>
                              <li>✅ Elementos potenciadores</li>
                              <li>✅ Modo carrera y equipos</li>
                              <li>✅ Gráficos 4K Ultra HD</li>
                            </ul>
                            
                            <div className="mt-3 p-3 bg-white rounded">
                              <h6 className="text-center mb-2">🏁 ¡Preparados, listos, transpórtense!</h6>
                              <p className="small text-center text-muted mb-0">
                                Acelera hacia la victoria y construye el vehículo definitivo.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PESTAÑA MÁS INFORMACIÓN */}
                {pestañaActiva === 'informacion' && (
                  <div className="tab-pane fade show active">
                    <h5>📊 Información Técnica</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <td><strong>Desarrollador:</strong></td>
                              <td>{juego.desarrollador || 'No especificado'}</td>
                            </tr>
                            <tr>
                              <td><strong>Lanzamiento:</strong></td>
                              <td>{juego.lanzamiento || 'No especificado'}</td>
                            </tr>
                            <tr>
                              <td><strong>Género:</strong></td>
                              <td>{juego.genero || juego.categoria}</td>
                            </tr>
                            <tr>
                              <td><strong>Plataformas:</strong></td>
                              <td>{juego.plataformas?.join(', ') || juego.plataforma}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-6">
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <td><strong>Clasificación:</strong></td>
                              <td>ESRB: E (Everyone)</td>
                            </tr>
                            <tr>
                              <td><strong>Idiomas:</strong></td>
                              <td>Español, Inglés, Francés</td>
                            </tr>
                            <tr>
                              <td><strong>Tamaño:</strong></td>
                              <td>45 GB aprox.</td>
                            </tr>
                            <tr>
                              <td><strong>Jugadores:</strong></td>
                              <td>1-8 online</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {}
                {pestañaActiva === 'reseñas' && (
                  <div className="tab-pane fade show active">
                    <h5>⭐ Reseñas de Usuarios</h5>
                    <div className="text-center py-4">
                      <div className="h1 text-warning">{(juego.calificacion || 4).toFixed(1)}</div>
                      <div className="mb-2">
                        {renderEstrellas(juego.calificacion || 4)}
                      </div>
                      <small className="text-muted">
                        Basado en {juego.reseñas || 0} reseñas
                      </small>
                      <div className="mt-3">
                        <button className="btn btn-primary me-2">Escribir Reseña</button>
                        <button className="btn btn-outline-secondary">Ver todas</button>
                      </div>
                    </div>
                  </div>
                )}

                {}
                {pestañaActiva === 'relacionados' && (
                  <div className="tab-pane fade show active">
                    <h5>🎮 Juegos Relacionados</h5>
                    <div className="row">
                      <div className="col-md-4 text-center">
                        <div className="card">
                          <img src="https://example.com/related1.jpg" className="card-img-top" alt="Related 1" />
                          <div className="card-body">
                            <h6 className="card-title">Sonic Forces</h6>
                            <p className="text-primary">$29.99</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="card">
                          <img src="https://example.com/related2.jpg" className="card-img-top" alt="Related 2" />
                          <div className="card-body">
                            <h6 className="card-title">Mario Kart 8</h6>
                            <p className="text-primary">$59.99</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="card">
                          <img src="https://example.com/related3.jpg" className="card-img-top" alt="Related 3" />
                          <div className="card-body">
                            <h6 className="card-title">Crash Team Racing</h6>
                            <p className="text-primary">$39.99</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;