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
    <div className="inicio-container">
      <ModalLogin 
        show={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      <section className="hero-section-inicio">
        <div className="container">
          <div className="row align-items-center min-vh-50 py-5">
            <div className="col-12 col-lg-8 mx-auto text-center">
              <h1 className="hero-title-inicio mb-3">
                <i className="fas fa-gamepad me-2"></i>
                Bienvenido a <span className="text-warning">G-ZONE</span>
              </h1>
              <p className="hero-subtitle-inicio mb-4">
                Descubre los mejores videojuegos para todas las plataformas
              </p>
              <div className="hero-buttons-inicio d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
                <Link to="/catalogo" className="btn btn-light btn-lg hero-btn-inicio">
                  <i className="fas fa-rocket me-2"></i>
                  Explorar Catálogo
                </Link>
                <Link 
                  to={isAuthenticated ? "/carrito" : "#"} 
                  className="btn btn-outline-light btn-lg hero-btn-inicio position-relative"
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
              
              <div className="hero-stats-inicio row justify-content-center g-4 mt-4">
                <div className="col-4 col-sm-4 col-md-4">
                  <div className="stat-item-inicio text-center">
                    <span className="stat-number-inicio d-block">500+</span>
                    <span className="stat-label-inicio">
                      <i className="fas fa-gamepad me-1"></i>
                      JUEGOS
                    </span>
                  </div>
                </div>
                <div className="col-4 col-sm-4 col-md-4">
                  <div className="stat-item-inicio text-center">
                    <span className="stat-number-inicio d-block">98%</span>
                    <span className="stat-label-inicio">
                      <i className="fas fa-smile me-1"></i>
                      SATISFACCIÓN
                    </span>
                  </div>
                </div>
                <div className="col-4 col-sm-4 col-md-4">
                  <div className="stat-item-inicio text-center">
                    <span className="stat-number-inicio d-block">24/7</span>
                    <span className="stat-label-inicio">
                      <i className="fas fa-headset me-1"></i>
                      SOPORTE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container titulo-carrusel mt-5 pt-4">
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
          data-bs-interval="3000"
          data-bs-pause="false"
        >
          
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="0" className="active" aria-label="God of War"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="1" aria-label="Zelda"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="2" aria-label="Cyberpunk"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="3" aria-label="FIFA"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="4" aria-label="GTA VI"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="5" aria-label="Counter-Strike"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="6" aria-label="Stardew Valley"></button>
            <button type="button" data-bs-target="#carouselGZone" data-bs-slide-to="7" aria-label="Celeste"></button>
          </div>

          <div className="carousel-inner rounded-4 shadow-lg overflow-hidden">
            
            <div className="carousel-item active position-relative">
              <Link to="/producto/1" className="d-block w-100 h-100">
                <img 
                  src="https://image.api.playstation.com/vulcan/ap/rnd/202503/2016/1f4bf1ee42276b3841e71ebb812510493ce78bfc307d3296.jpg?w=5000&thumb=false" 
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

            <div className="carousel-item position-relative">
              <Link to="/producto/46" className="d-block w-100 h-100">
                <img 
                  src="https://image.api.playstation.com/vulcan/ap/rnd/202505/0616/4c09a11c959eb85b6e1850fb544a3a568e8a4f0ea84413e3.jpg?w=5000&thumb=false" 
                  className="d-block w-100" 
                  alt="Grand Theft Auto VI"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">Grand Theft Auto VI</h3>
                  <p className="mb-0">Regresa a Vice City en 2025</p>
                </div>
              </Link>
            </div>

            <div className="carousel-item position-relative">
              <Link to="/producto/34" className="d-block w-100 h-100">
                <img 
                  src="https://image.api.playstation.com/vulcan/ap/rnd/202509/3008/353fba7b67041019a476b36dca0b613baebd2eaedbdbef2b.png?w=5000&thumb=false" 
                  className="d-block w-100" 
                  alt="Counter-Strike 2"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">Counter-Strike 2</h3>
                  <p className="mb-0">Shooter táctico competitivo</p>
                </div>
              </Link>
            </div>

            <div className="carousel-item position-relative">
              <Link to="/producto/57" className="d-block w-100 h-100">
                <img 
                  src="https://image.api.playstation.com/vulcan/img/rnd/202010/1520/yPmlPNe9extT2AVsv90hOKmn.png?w=5000&thumb=false" 
                  className="d-block w-100" 
                  alt="Stardew Valley"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">Stardew Valley</h3>
                  <p className="mb-0">Simulación relajante de vida rural</p>
                </div>
              </Link>
            </div>

            <div className="carousel-item position-relative">
              <Link to="/producto/54" className="d-block w-100 h-100">
                <img 
                  src="https://image.api.playstation.com/cdn/UP2120/CUSA11302_00/hgqlI1LTcsd6zuL7YWVLQ8d00jkBmtCg.jpg?w=5000&thumb=false" 
                  className="d-block w-100" 
                  alt="Celeste"
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block text-start">
                  <h3 className="fw-bold mb-1">Celeste</h3>
                  <p className="mb-0">Aventura de plataformas sobre superación</p>
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
      <div className="container mt-4 mt-md-5">
        <div className="row text-center mb-5">
          <div className="col-12 col-md-4 mb-4">
            <div 
              className="feature-card clickable-card h-100"
              onClick={() => window.location.href = '/catalogo'}
            >
              <div className="feature-icon">
                <i className="fas fa-gamepad fa-3x"></i>
              </div>
              <h3>Amplia Variedad</h3>
              <p className="feature-description">
                Juegos para PS5, Xbox, Nintendo Switch y PC
              </p>
              <div className="feature-link">
                <small className="text-primary">
                  Ver catálogo <i className="fas fa-arrow-right ms-1"></i>
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div 
              className="feature-card clickable-card h-100"
              onClick={() => window.location.href = '/catalogo'}
            >
              <div className="feature-icon">
                <i className="fas fa-tags fa-3x"></i>
              </div>
              <h3>Mejores Precios</h3>
              <p className="feature-description">
                Ofertas exclusivas y precios competitivos
              </p>
              <div className="feature-link">
                <small className="text-primary">
                  Ver ofertas <i className="fas fa-arrow-right ms-1"></i>
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div 
              className="feature-card clickable-card h-100"
              onClick={() => window.location.href = '/centro-ayuda'}
            >
              <div className="feature-icon">
                <i className="fas fa-shipping-fast fa-3x"></i>
              </div>
              <h3>Envío Rápido</h3>
              <p className="feature-description">
                Recibe tus juegos en la puerta de tu casa
              </p>
              <div className="feature-link">
                <small className="text-primary">
                  Más información <i className="fas fa-arrow-right ms-1"></i>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-products-responsive py-4 py-md-5">
        <div className="container">
          <div className="section-header text-center mb-4 mb-md-5">
            <h2 className="section-title-responsive mb-2">
              <i className="fas fa-crown me-2 text-warning"></i>
              Productos Destacados
            </h2>
            <p className="section-subtitle-responsive">Los títulos más populares de nuestra colección</p>
          </div>
          
          <div className="row g-3 g-md-4">
            {productosDestacados.map(producto => (
              <div key={producto.id} className="col-12 col-sm-6 col-lg-3">
                <div className="product-card-responsive h-100">
                  <div className="product-image-container-responsive">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="product-image-responsive"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/64748b/ffffff?text=Imagen+No+Disponible';
                      }}
                    />
                    <div className="product-platform-responsive">
                      {producto.plataforma}
                    </div>
                    <div className="product-badge-responsive">
                      <i className="fas fa-star me-1"></i>
                      Destacado
                    </div>
                  </div>
                  
                  <div className="product-content-responsive">
                    <div className="product-category-responsive">{producto.categoria}</div>
                    <h3 className="product-title-responsive">{producto.nombre}</h3>
                    <p className="product-description-responsive">{producto.descripcion}</p>
                    
                    <div className="product-features-responsive">
                      {producto.caracteristicas.map((feature, index) => (
                        <span key={index} className="feature-tag-responsive">
                          <i className="fas fa-check-circle me-1"></i>
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="product-footer-responsive">
                      <div className="product-price-responsive">
                        <i className="fas fa-tag me-1"></i>
                        ${producto.precio}
                      </div>
                      <div className="product-actions-responsive">
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

          <div className="text-center mt-4 mt-md-5">
            <Link to="/catalogo" className="btn btn-primary btn-lg me-2 me-md-3 mb-2 mb-md-0">
              <i className="fas fa-th-list me-2"></i>
              Ver Todos los Productos
            </Link>
            <Link 
              to={isAuthenticated ? "/carrito" : "#"} 
              className="btn btn-outline-primary btn-lg mb-2 mb-md-0"
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