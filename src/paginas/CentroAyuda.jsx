import { useState, useContext, useEffect } from 'react';
import { ticketService } from '../servicios/ticketService';
import { AuthContext } from '../contexto/AuthContext';

function CentroAyuda() {
  const { user } = useContext(AuthContext);
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
    <div className="container mt-3 mt-md-4 mt-lg-5 centro-ayuda-responsive">
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          <strong>¡Éxito!</strong> Tu mensaje ha sido enviado. Te contactaremos pronto.
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      <div className="row">
        <div className="col-12 text-center mb-4 mb-md-5">
          <h1 className="fw-bold centro-ayuda-title">Centro de Ayuda</h1>
          <p className="lead text-muted centro-ayuda-subtitle">
            ¿Tienes alguna duda? Estamos aquí para ayudarte
          </p>
        </div>
      </div>

      {user && (
        <div className="row mb-3 mb-md-4">
          <div className="col-12">
            <button 
              className="btn btn-outline-primary centro-ayuda-ticket-btn"
              onClick={() => setShowTickets(!showTickets)}
            >
              <i className={`fas fa-${showTickets ? 'eye-slash' : 'history'} me-2`}></i>
              {showTickets ? 'Ocultar' : 'Ver'} mis tickets anteriores ({misTickets.length})
            </button>
          </div>
        </div>
      )}

      {showTickets && user && (
        <div className="row mb-3 mb-md-4">
          <div className="col-12">
            <div className="card shadow-sm centro-ayuda-ticket-card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0 centro-ayuda-ticket-title">
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
                  <div className="table-responsive centro-ayuda-table">
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

      <div className="row centro-ayuda-main-row">
        <div className="col-12 col-lg-8 mb-4">
          <div className="card shadow-sm centro-ayuda-card centro-ayuda-form-card">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex align-items-center mb-4 centro-ayuda-form-header">
                <i className="fas fa-ticket-alt fa-2x text-primary me-3"></i>
                <div>
                  <h4 className="fw-bold mb-0 centro-ayuda-form-title">Sistema de Tickets de Soporte</h4>
                  <p className="text-muted mb-0 centro-ayuda-form-subtitle">
                    {user ? 'Estás logueado. Tu ticket se vinculará a tu cuenta.' : 'No estás logueado. Tu ticket se gestionará por email.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 mb-md-4">
                  <label className="form-label fw-bold centro-ayuda-label">
                    <i className="fas fa-user me-2 text-primary"></i>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="form-control centro-ayuda-input"
                    placeholder="Tu nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={user}
                  />
                </div>

                <div className="mb-3 mb-md-4">
                  <label className="form-label fw-bold centro-ayuda-label">
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control centro-ayuda-input"
                    placeholder="correo@ejemplo.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={user}
                  />
                </div>

                <div className="mb-3 mb-md-4">
                  <label className="form-label fw-bold centro-ayuda-label">
                    <i className="fas fa-tag me-2 text-primary"></i>
                    Categoría
                  </label>
                  <select 
                    className="form-select centro-ayuda-select"
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

                <div className="mb-3 mb-md-4">
                  <label className="form-label fw-bold centro-ayuda-label">
                    <i className="fas fa-heading me-2 text-primary"></i>
                    Asunto
                  </label>
                  <input
                    type="text"
                    className="form-control centro-ayuda-input"
                    placeholder="Resumen de tu consulta"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 mb-md-4">
                  <label className="form-label fw-bold centro-ayuda-label">
                    <i className="fas fa-comment-dots me-2 text-primary"></i>
                    Mensaje
                  </label>
                  <textarea
                    className="form-control centro-ayuda-textarea"
                    rows="5"
                    placeholder="Describe detalladamente tu consulta o problema..."
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-enviar centro-ayuda-submit-btn"
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

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm centro-ayuda-card centro-ayuda-info-card">
            <div className="card-body p-3 p-md-4">
              <h5 className="card-title fw-bold mb-4 centro-ayuda-info-title">
                <i className="fas fa-address-card me-2 text-primary"></i>
                Información de contacto
              </h5>
              <p className="text-muted mb-4 centro-ayuda-info-text">
                ¿Prefieres comunicarte directamente con nosotros? Aquí tienes todas nuestras vías de contacto.
              </p>

              <div className="contacto-info-item centro-ayuda-contact-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white centro-ayuda-contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 centro-ayuda-contact-title">Dirección</h6>
                    <p className="text-muted mb-0 small centro-ayuda-contact-text">
                      Av. Garners #404, Colonia Digital, Ciudad Virtual
                    </p>
                  </div>
                </div>
              </div>

              <div className="contacto-info-item centro-ayuda-contact-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white centro-ayuda-contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 centro-ayuda-contact-title">Teléfono</h6>
                    <p className="text-muted mb-0 small centro-ayuda-contact-text">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="contacto-info-item centro-ayuda-contact-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white centro-ayuda-contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 centro-ayuda-contact-title">Email</h6>
                    <p className="text-muted mb-0 small centro-ayuda-contact-text">contacto@garnevortex.com</p>
                  </div>
                </div>
              </div>

              <div className="contacto-info-item centro-ayuda-contact-item">
                <div className="d-flex align-items-center">
                  <div className="contacto-icon text-white centro-ayuda-contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 centro-ayuda-contact-title">Horario de atención</h6>
                    <p className="text-muted mb-0 small centro-ayuda-contact-text">Lun-Vie: 9am - 8pm</p>
                    <p className="text-muted small centro-ayuda-contact-text">Sábados: 10am - 6pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 centro-ayuda-social-section">
                <h6 className="fw-bold mb-3 centro-ayuda-social-title">
                  <i className="fas fa-share-alt me-2"></i>
                  Síguenos
                </h6>
                <div className="d-flex gap-2 gap-md-3 centro-ayuda-social-icons">
                  <a href="#" className="social-icon text-dark centro-ayuda-social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon text-dark centro-ayuda-social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon text-dark centro-ayuda-social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon text-dark centro-ayuda-social-icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 mt-md-5 centro-ayuda-map-row">
        <div className="col-12">
          <div className="card shadow-sm centro-ayuda-card centro-ayuda-map-card">
            <div className="card-body p-3 p-md-4">
              <h3 className="fw-bold mb-4 text-center centro-ayuda-map-title">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                Visítanos en Wilson - Lima
              </h3>
              
              <div className="row centro-ayuda-map-content">
                <div className="col-12 col-lg-8 mb-3 mb-lg-0">
                  <div className="map-container rounded-3 overflow-hidden shadow centro-ayuda-map-iframe">
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
                
                <div className="col-12 col-lg-4">
                  <div className="direcciones-info centro-ayuda-direcciones">
                    <h5 className="fw-bold mb-3 centro-ayuda-direcciones-title">Mercado Wilson</h5>
                    <p className="text-muted mb-3 centro-ayuda-direcciones-text">
                     Av. Wilson, Cercado de Lima 15001, Perú
                    </p>
                    
                    <div className="mb-3">
                      <a 
                        href="https://www.google.com/maps/place/Av+Wilson,+Lima/@-12.0663578,-77.0362704,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c8b1a6a8a8a7:0x14206cb9cc452b4a!8m2!3d-12.0663631!4d-77.0336955!16s%2Fg%2F1216v7p0?entry=ttu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm centro-ayuda-map-btn"
                      >
                        <i className="fas fa-expand me-2"></i>
                        Ver mapa más grande
                      </a>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <h6 className="fw-bold mb-3 centro-ayuda-features-title">En Wilson encontrarás:</h6>
                    <ul className="list-unstyled small text-muted centro-ayuda-features-list">
                      <li className="mb-1 centro-ayuda-feature-item">
                        <i className="fas fa-landmark me-2 text-primary"></i>
                        Videojuegos para todas las consolas
                      </li>
                      <li className="mb-1 centro-ayuda-feature-item">
                        <i className="fas fa-church me-2 text-primary"></i>
                        Laptops gaming y accesorios
                      </li>
                      <li className="mb-1 centro-ayuda-feature-item">
                        <i className="fas fa-university me-2 text-primary"></i>
                        Componentes de PC gamer
                      </li>
                      <li className="mb-1 centro-ayuda-feature-item">
                        <i className="fas fa-building me-2 text-primary"></i>
                        Periféricos gaming
                      </li>
                      <li className="mb-1 centro-ayuda-feature-item">
                        <i className="fas fa-history me-2 text-primary"></i>
                        Accesorios para móviles
                      </li>
                      <li className="mb-1 centro-ayuda-feature-item">
                        <i className="fas fa-store me-2 text-primary"></i>
                        Los mejores precios de Lima
                      </li>
                    </ul>
                     <div className="mt-3 p-3 bg-warning bg-opacity-10 rounded centro-ayuda-schedule">
                      <small className="text-muted centro-ayuda-schedule-text">
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