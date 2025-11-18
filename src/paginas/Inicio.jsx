import { Link } from "react-router-dom";
import { useCarrito } from "../contexto/CarritoContext";
import { useAuth } from "../contexto/AuthContext";
import { useState } from "react";
import ModalLogin from "../componentes/ModalLogin";

function Inicio() {
  const { agregarAlCarrito, cantidadTotal } = useCarrito();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const productosDestacados = [
    {
      id: 1,
      nombre: "God of War Ragnarök",
      precio: 59.99,
      imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
      plataforma: "PS5",
      categoria: "Acción-Aventura",
      descripcion: "Kratos y Atreus se embarcan en un viaje épico en los Nueve Reinos nórdicos.",
      caracteristicas: ["Modo Historia", "Gráficos 4K", "DualSense"]
    },
    {
      id: 2,
      nombre: "The Legend of Zelda: TOTK",
      precio: 69.99,
      imagen: "https://tse4.mm.bing.net/th/id/OIP.N8TsUVXvmdsVfmP8hbmuHQHaG3?rs=1&pid=ImgDetMain&o=7&rm=3",
      plataforma: "Nintendo Switch",
      categoria: "Aventura",
      descripcion: "Explora los cielos y descubre los secretos del reino de Hyrule.",
      caracteristicas: ["Mundo Abierto", "Física Realista", "120+ Horas"]
    },
    {
      id: 3,
      nombre: "Cyberpunk 2077: Phantom Liberty",
      precio: 49.99,
      imagen: "https://tse2.mm.bing.net/th/id/OIP.NLzqbgggrOIXEw8fadqLjAHaE6?w=900&h=598&rs=1&pid=ImgDetMain&o=7&rm=3",
      plataforma: "PC/PS5/Xbox",
      categoria: "RPG",
      descripcion: "Inmersivo RPG de mundo abierto en la distópica Night City.",
      caracteristicas: ["Ray Tracing", "Personalización", "Historia No Lineal"]
    },
    {
      id: 4,
      nombre: "FIFA 24",
      precio: 69.99,
      imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202406/0500/10f802ee37d38f52d49aff7064fa41739aa0dbb77310a755.png",
      plataforma: "Multiplataforma",
      categoria: "Deportes",
      descripcion: "La experiencia de fútbol más auténtica con HyperMotion2.",
      caracteristicas: ["Ultimate Team", "Cross-Play", "Licencias Oficiales"]
    }
  ];

  const handleAgregarCarritoProtegido = (producto) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    agregarAlCarrito(producto);
    
    const boton = document.getElementById(`boton-carrito-${producto.id}`);
    if (boton) {
      const originalText = boton.innerHTML;
      boton.innerHTML = '<i class="fas fa-check me-1"></i> Agregado';
      boton.classList.remove('btn-primary');
      boton.classList.add('btn-success');
      
      setTimeout(() => {
        boton.innerHTML = originalText;
        boton.classList.remove('btn-success');
        boton.classList.add('btn-primary');
      }, 1500);
    }
  };

  const handleVerCarritoClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div>
      <ModalLogin 
        show={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      <section className="hero-section-improved">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="hero-title-improved">
                <i className="fas fa-gamepad me-2"></i>
                Bienvenido a <span style={{color: '#ffd700'}}>G-ZONE</span>
              </h1>
              <p className="hero-subtitle-improved">
                Descubre los mejores videojuegos para todas las plataformas
              </p>
              <div className="hero-buttons-improved">
                <Link to="/catalogo" className="btn btn-light btn-lg hero-btn-improved me-3">
                  <i className="fas fa-rocket me-2"></i>
                  Explorar Catálogo
                </Link>
                <Link 
                  to={isAuthenticated ? "/carrito" : "#"} 
                  className="btn btn-outline-light btn-lg hero-btn-improved position-relative"
                  onClick={handleVerCarritoClick}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Ver Carrito
                  {cantidadTotal > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {cantidadTotal}
                    </span>
                  )}
                </Link>
              </div>
              
              <div className="hero-stats-improved mt-4">
                <div className="stat-item-improved">
                  <span className="stat-number-improved">500+</span>
                  <span className="stat-label-improved">
                    <i className="fas fa-gamepad me-1"></i>
                    JUEGOS
                  </span>
                </div>
                <div className="stat-item-improved">
                  <span className="stat-number-improved">98%</span>
                  <span className="stat-label-improved">
                    <i className="fas fa-smile me-1"></i>
                    SATISFACCIÓN
                  </span>
                </div>
                <div className="stat-item-improved">
                  <span className="stat-number-improved">24/7</span>
                  <span className="stat-label-improved">
                    <i className="fas fa-headset me-1"></i>
                    SOPORTE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container titulo-carrusel">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="fw-bold mb-0">
                DESTACADOS Y RECOMENDADOS
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div 
          id="carouselGZone" 
          className="carousel slide carousel-fade" 
          data-bs-ride="carousel" 
          data-bs-interval="4000"
          data-bs-pause="false"
        >
          <div className="carousel-indicators">
            <button 
              type="button" 
              data-bs-target="#carouselGZone" 
              data-bs-slide-to="0" 
              className="active" 
              aria-current="true" 
              aria-label="God of War"
            ></button>
            <button 
              type="button" 
              data-bs-target="#carouselGZone" 
              data-bs-slide-to="1" 
              aria-label="Zelda"
            ></button>
            <button 
              type="button" 
              data-bs-target="#carouselGZone" 
              data-bs-slide-to="2" 
              aria-label="Cyberpunk"
            ></button>
            <button 
              type="button" 
              data-bs-target="#carouselGZone" 
              data-bs-slide-to="3" 
              aria-label="FIFA"
            ></button>
          </div>

          <div className="carousel-inner rounded-4 shadow-lg overflow-hidden">
            <div className="carousel-item active position-relative">
              <Link to="/producto/1" className="d-block w-100 h-100">
                <img 
                  src="https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-ragnarok-watermark-screenshot-12-en-08sep21?$1600px$" 
                  className="d-block w-100" 
                  alt="God of War Ragnarök"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">God of War Ragnarök</h3>
                  <p className="mb-0">Aventura épica nórdica</p>
                </div>
              </Link>
            </div>

            <div className="carousel-item position-relative">
              <Link to="/producto/2" className="d-block w-100 h-100">
                <img 
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/CEKMSZJJKJED5LZBVBY4C4BO7Y.jpg" 
                  className="d-block w-100" 
                  alt="The Legend of Zelda: TOTK"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">Zelda: Tears of the Kingdom</h3>
                  <p className="mb-0">Explora cielos y profundidades</p>
                </div>
              </Link>
            </div>

            <div className="carousel-item position-relative">
              <Link to="/producto/3" className="d-block w-100 h-100">
                <img 
                  src="https://gmedia.playstation.com/is/image/SIEPDC/cyberpunk-2077-screen-22-ps4-en-06jun19?$1600px$" 
                  className="d-block w-100" 
                  alt="Cyberpunk 2077"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">Cyberpunk 2077</h3>
                  <p className="mb-0">RPG futurista en Night City</p>
                </div>
              </Link>
            </div>

            <div className="carousel-item position-relative">
              <Link to="/producto/4" className="d-block w-100 h-100">
                <img 
                  src="https://gmedia.playstation.com/is/image/SIEPDC/ea-sports-fc-26-walkout-screenshot-03-en-08jul25?$1600px$" 
                  className="d-block w-100" 
                  alt="FIFA 24"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">FIFA 24</h3>
                  <p className="mb-0">Fútbol de última generación</p>
                </div>
              </Link>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselGZone" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselGZone" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-gamepad fa-3x"></i>
              </div>
              <h3>Amplia Variedad</h3>
              <p className="feature-description">
                Juegos para PS5, Xbox, Nintendo Switch y PC
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tags fa-3x"></i>
              </div>
              <h3>Mejores Precios</h3>
              <p className="feature-description">
                Ofertas exclusivas y precios competitivos
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast fa-3x"></i>
              </div>
              <h3>Envío Rápido</h3>
              <p className="feature-description">
                Recibe tus juegos en la puerta de tu casa
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-products">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">
              <i className="fas fa-crown me-2 text-warning"></i>
              Productos Destacados
            </h2>
            <p className="section-subtitle">Los títulos más populares de nuestra colección</p>
          </div>
          
          <div className="row g-4">
            {productosDestacados.map(producto => (
              <div key={producto.id} className="col-lg-3 col-md-6">
                <div className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/64748b/ffffff?text=Imagen+No+Disponible';
                      }}
                    />
                    <div className="product-platform">
                      {producto.plataforma}
                    </div>
                    <div className="product-badge">
                      <i className="fas fa-star me-1"></i>
                      Destacado
                    </div>
                  </div>
                  
                  <div className="product-content">
                    <div className="product-category">{producto.categoria}</div>
                    <h3 className="product-title">{producto.nombre}</h3>
                    <p className="product-description">{producto.descripcion}</p>
                    
                    <div className="product-features">
                      {producto.caracteristicas.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          <i className="fas fa-check-circle me-1"></i>
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="product-footer">
                      <div className="product-price">
                        <i className="fas fa-tag me-1"></i>
                        ${producto.precio}
                      </div>
                      <div className="product-actions">
                        <button 
                          id={`boton-carrito-${producto.id}`}
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAgregarCarritoProtegido(producto)}
                        >
                          <i className="fas fa-shopping-cart me-1"></i>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/catalogo" className="btn btn-primary btn-lg me-3">
              <i className="fas fa-th-list me-2"></i>
              Ver Todos los Productos
            </Link>
            <Link 
              to={isAuthenticated ? "/carrito" : "#"} 
              className="btn btn-outline-primary btn-lg"
              onClick={handleVerCarritoClick}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Ir al Carrito ({cantidadTotal})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio;