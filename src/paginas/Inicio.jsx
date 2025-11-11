import { Link } from "react-router-dom";
import { useCarrito } from "../contexto/CarritoContext";

function Inicio() {
  const { agregarAlCarrito, cantidadTotal } = useCarrito();

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

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
    
    // Efecto visual de confirmación
    const boton = document.getElementById(`boton-carrito-${producto.id}`);
    if (boton) {
      const originalText = boton.innerHTML;
      boton.innerHTML = '✅ Agregado';
      boton.classList.remove('btn-primary');
      boton.classList.add('btn-success');
      
      setTimeout(() => {
        boton.innerHTML = originalText;
        boton.classList.remove('btn-success');
        boton.classList.add('btn-primary');
      }, 1500);
    }
  };

  return (
    <div>
      {/* NUEVO HERO SECTION MEJORADO */}
      <section className="hero-section-improved">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="hero-title-improved">
                🎮 Bienvenido a <span style={{color: '#ffd700'}}>G-ZONE</span>
              </h1>
              <p className="hero-subtitle-improved">
                Descubre los mejores videojuegos para todas las plataformas
              </p>
              <div className="hero-buttons-improved">
                <Link to="/catalogo" className="btn btn-light btn-lg hero-btn-improved me-3">
                  🚀 Explorar Catálogo
                </Link>
                <Link to="/carrito" className="btn btn-outline-light btn-lg hero-btn-improved position-relative">
                  🛒 Ver Carrito
                  {cantidadTotal > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {cantidadTotal}
                    </span>
                  )}
                </Link>
              </div>
              
              {/* Stats rápidos */}
              <div className="hero-stats-improved mt-4">
                <div className="stat-item-improved">
                  <span className="stat-number-improved">500+</span>
                  <span className="stat-label-improved">JUEGOS</span>
                </div>
                <div className="stat-item-improved">
                  <span className="stat-number-improved">98%</span>
                  <span className="stat-label-improved">SATISFACCIÓN</span>
                </div>
                <div className="stat-item-improved">
                  <span className="stat-number-improved">24/7</span>
                  <span className="stat-label-improved">SOPORTE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TUS 3 TARJETAS ORIGINALES - SE MANTIENEN */}
      <div className="container mt-4">
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Amplia Variedad</h3>
              <p className="feature-description">
                Juegos para PS5, Xbox, Nintendo Switch y PC
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Mejores Precios</h3>
              <p className="feature-description">
                Ofertas exclusivas y precios competitivos
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Envío Rápido</h3>
              <p className="feature-description">
                Recibe tus juegos en la puerta de tu casa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TUS PRODUCTOS DESTACADOS - SE MANTIENEN */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Productos Destacados</h2>
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
                      Destacado
                    </div>
                  </div>
                  
                  <div className="product-content">
                    <div className="product-category">{producto.categoria}</div>
                    <h3 className="product-title">{producto.nombre}</h3>
                    <p className="product-description">{producto.descripcion}</p>
                    
                    <div className="product-features">
                      {producto.caracteristicas.map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                    
                    <div className="product-footer">
                      <div className="product-price">${producto.precio}</div>
                      <div className="product-actions">
                        <button 
                          id={`boton-carrito-${producto.id}`}
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAgregarCarrito(producto)}
                        >
                          🛒 Agregar
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
              Ver Todos los Productos
            </Link>
            <Link to="/carrito" className="btn btn-outline-primary btn-lg">
              Ir al Carrito ({cantidadTotal})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio;