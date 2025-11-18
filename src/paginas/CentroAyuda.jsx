import { useState, useContext, useEffect } from 'react'; // ✅ Agregar useContext y useEffect
import { ticketService } from '../servicios/ticketService';
import { AuthContext } from '../contexto/AuthContext';

function CentroAyuda() {
  const { user } = useContext(AuthContext); // ✅ Ahora funciona
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    categoria: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [misTickets, setMisTickets] = useState([]);
  const [showTickets, setShowTickets] = useState(false);

  // Cargar datos del usuario si está autenticado
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.nombre || '',
        email: user.email || ''
      }));
      cargarMisTickets();
    }
  }, [user]);

  const cargarMisTickets = async () => {
    try {
      const response = await ticketService.obtenerMisTickets();
      setMisTickets(response.data || []);
    } catch (error) {
      console.log('No se pudieron cargar tickets anteriores');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ticketService.crearTicket(formData);
      setShowSuccess(true);
      setFormData({
        nombre: user?.nombre || '',
        email: user?.email || '',
        asunto: '',
        mensaje: '',
        categoria: 'general'
      });
      
      if (user) cargarMisTickets();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      alert('Error al enviar el mensaje: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const estilos = {
      abierto: 'bg-success text-white',
      en_progreso: 'bg-warning text-dark',
      cerrado: 'bg-secondary text-white'
    };
    return (
      <span className={`badge ${estilos[estado] || 'bg-light text-dark'}`}>
        {estado?.replace('_', ' ') || 'abierto'}
      </span>
    );
  };

  return (
    <div className="container mt-4">
      {/* Alert de éxito */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          <strong>¡Éxito!</strong> Tu mensaje ha sido enviado. Te contactaremos pronto.
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="fw-bold">Centro de Ayuda</h1>
          <p className="lead text-muted">
            ¿Tienes alguna duda? Estamos aquí para ayudarte
          </p>
        </div>
      </div>

      {/* Botón para ver tickets anteriores */}
      {user && (
        <div className="row mb-4">
          <div className="col-12">
            <button 
              className="btn btn-outline-primary"
              onClick={() => setShowTickets(!showTickets)}
            >
              <i className={`fas fa-${showTickets ? 'eye-slash' : 'history'} me-2`}></i>
              {showTickets ? 'Ocultar' : 'Ver'} mis tickets anteriores ({misTickets.length})
            </button>
          </div>
        </div>
      )}

      {/* Lista de tickets anteriores */}
      {showTickets && user && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-ticket-alt me-2"></i>
                  Mis Tickets de Soporte
                </h5>
              </div>
              <div className="card-body">
                {misTickets.length === 0 ? (
                  <p className="text-muted text-center mb-0">
                    No tienes tickets anteriores.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Asunto</th>
                          <th>Categoría</th>
                          <th>Estado</th>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {misTickets.map((ticket) => (
                          <tr key={ticket._id}>
                            <td>
                              <strong>{ticket.asunto}</strong>
                              <br />
                              <small className="text-muted">{ticket.mensaje.substring(0, 50)}...</small>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark">
                                {ticket.categoria}
                              </span>
                            </td>
                            <td>
                              {getEstadoBadge(ticket.estado)}
                            </td>
                            <td>
                              <small className="text-muted">
                                {new Date(ticket.createdAt).toLocaleDateString()}
                              </small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {/* Formulario de Contacto MEJORADO */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm centro-ayuda-card">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <i className="fas fa-ticket-alt fa-2x text-primary me-3"></i>
                <div>
                  <h4 className="fw-bold mb-0">Sistema de Tickets de Soporte</h4>
                  <p className="text-muted mb-0">
                    {user ? 'Estás logueado. Tu ticket se vinculará a tu cuenta.' : 'No estás logueado. Tu ticket se gestionará por email.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Nombre completo */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="fas fa-user me-2 text-primary"></i>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tu nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={user}
                  />
                </div>

                {/* Correo electrónico */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={user}
                  />
                </div>

                {/* Categoría (NUEVO) */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="fas fa-tag me-2 text-primary"></i>
                    Categoría
                  </label>
                  <select 
                    className="form-select"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General</option>
                    <option value="tecnico">Soporte Técnico</option>
                    <option value="pago">Problemas de Pago</option>
                    <option value="cuenta">Cuenta y Perfil</option>
                    <option value="producto">Información de Productos</option>
                  </select>
                </div>

                {/* Asunto (modificado de select a input) */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="fas fa-heading me-2 text-primary"></i>
                    Asunto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Resumen de tu consulta"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mensaje */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="fas fa-comment-dots me-2 text-primary"></i>
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Describe detalladamente tu consulta o problema..."
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Botón Enviar */}
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-enviar"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Enviar Ticket de Soporte
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Información de Contacto - SE MANTIENE IGUAL */}
        <div className="col-lg-4">
          <div className="card shadow-sm centro-ayuda-card">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4">
                <i className="fas fa-address-card me-2 text-primary"></i>
                Información de contacto
              </h5>
              <p className="text-muted mb-4">
                ¿Prefieres comunicarte directamente con nosotros? Aquí tienes todas nuestras vías de contacto.
              </p>

              <div className="contacto-info-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Dirección</h6>
                    <p className="text-muted mb-0 small">
                      Av. Garners #404, Colonia Digital, Ciudad Virtual
                    </p>
                  </div>
                </div>
              </div>

              <div className="contacto-info-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Teléfono</h6>
                    <p className="text-muted mb-0 small">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="contacto-info-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0 small">contacto@garnevortex.com</p>
                  </div>
                </div>
              </div>

              <div className="contacto-info-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Horario de atención</h6>
                    <p className="text-muted mb-0 small">Lun-Vie: 9am - 8pm</p>
                    <p className="text-muted small">Sábados: 10am - 6pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h6 className="fw-bold mb-3">
                  <i className="fas fa-share-alt me-2"></i>
                  Síguenos
                </h6>
                <div className="d-flex gap-3">
                  <a href="#" className="social-icon text-dark">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon text-dark">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon text-dark">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon text-dark">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DEL MAPA - SE MANTIENE INTACTA */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow-sm centro-ayuda-card">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4 text-center">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                Visítanos en Wilson - Lima
              </h3>
              
              <div className="row">
                {/* Mapa de Lima */}
                <div className="col-lg-8 mb-4">
                  <div className="map-container rounded-3 overflow-hidden shadow">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.788215384273!2d-77.0362703852187!3d-12.066357791465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b1a6a8a8a7%3A0x14206cb9cc452b4a!2sAv%20Wilson%2C%20Lima%2015001!5e0!3m2!1ses!2spe!4v1620000000000!5m2!1ses!2spe"
                      width="100%" 
                      height="400" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nuestra ubicación en Lima, Perú"
                    ></iframe>
                  </div>
                </div>
                
                {/* Información de direcciones en Lima */}
                <div className="col-lg-4">
                  <div className="direcciones-info">
                    <h5 className="fw-bold mb-3">Mercado Wilson</h5>
                    <p className="text-muted mb-3">
                     Av. Wilson, Cercado de Lima 15001, Perú
                    </p>
                    
                    <div className="mb-3">
                      <a 
                        href="https://www.google.com/maps/place/Av+Wilson,+Lima/@-12.0663578,-77.0362704,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c8b1a6a8a8a7:0x14206cb9cc452b4a!8m2!3d-12.0663631!4d-77.0336955!16s%2Fg%2F1216v7p0?entry=ttu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="fas fa-expand me-2"></i>
                        Ver mapa más grande
                      </a>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <h6 className="fw-bold mb-3">En Wilson encontrarás:</h6>
                    <ul className="list-unstyled small text-muted">
                      <li className="mb-1">
                        <i className="fas fa-landmark me-2 text-primary"></i>
                        Videojuegos para todas las consolas
                      </li>
                      <li className="mb-1">
                        <i className="fas fa-church me-2 text-primary"></i>
                        Laptops gaming y accesorios
                      </li>
                      <li className="mb-1">
                        <i className="fas fa-university me-2 text-primary"></i>
                        Componentes de PC gamer
                      </li>
                      <li className="mb-1">
                        <i className="fas fa-building me-2 text-primary"></i>
                        Periféricos gaming
                      </li>
                      <li className="mb-1">
                        <i className="fas fa-history me-2 text-primary"></i>
                        Accesorios para móviles
                      </li>
                      <li className="mb-1">
                        <i className="fas fa-store me-2 text-primary"></i>
                        Los mejores precios de Lima
                      </li>
                    </ul>
                     <div className="mt-3 p-3 bg-warning bg-opacity-10 rounded">
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        <strong>Horario Wilson:</strong> Lunes a Sábado 9am - 7pm
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CentroAyuda;