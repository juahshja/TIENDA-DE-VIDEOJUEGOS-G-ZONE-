import { useCarrito } from '../contexto/CarritoContext';
import { useState } from 'react';
import confetti from 'canvas-confetti';

function Carrito() {
  const { 
    carrito, 
    agregarAlCarrito, 
    quitarDelCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito,
    totalCarrito 
  } = useCarrito();
  
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const lanzarConfeti = () => {
    // Confeti inicial EXPLOSIVO - toda la pantalla
    confetti({
      particleCount: 400,
      spread: 200,
      origin: { y: 0.3 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6b6b', '#4ecdc4'],
      zIndex: 10000
    });

    // Explosiones laterales
    setTimeout(() => {
      confetti({
        particleCount: 200,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: ['#ff6b6b', '#ee5a24', '#f9ca24'],
        zIndex: 10000
      });

      confetti({
        particleCount: 200,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: ['#4834d4', '#686de0', '#7ed6df'],
        zIndex: 10000
      });
    }, 300);

    // Explosión desde abajo
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        startVelocity: 55,
        origin: { y: 1.1 },
        colors: ['#00d2d3', '#54a0ff', '#5f27cd'],
        zIndex: 10000
      });
    }, 600);
  };

  const handleProcederPago = () => {
    setMostrarConfirmacion(true);
    lanzarConfeti();
  };

  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
    vaciarCarrito();
  };

  if (carrito.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">Tu carrito está vacío</h4>
            <p>¡Explora nuestro catálogo y descubre juegos increíbles!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* MODAL DE CONFIRMACIÓN ÉPICO MEJORADO */}
      {mostrarConfirmacion && (
        <>
          {/* Fondo oscuro para mejor contraste */}
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9998
            }}
          >
            {/* Modal mejorado */}
            <div 
              className="modal-content border-0 shadow-lg rounded-3 position-relative"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)',
                border: '2px solid #667eea',
                zIndex: 9999,
                maxWidth: '500px',
                width: '90%'
              }}
            >
              {/* Header con glow effect */}
              <div 
                className="modal-header border-0 text-white text-center position-relative"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px 10px 0 0'
                }}
              >
                <h3 className="modal-title fw-bold w-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  🎮 ¡FELICIDADES! 🎮
                </h3>
              </div>
              
              {/* Body con mejor diseño */}
              <div className="modal-body text-center py-4 px-3" style={{background: '#1a1a1a', color: 'white'}}>
                <div className="mb-3">
                  <div 
                    style={{
                      fontSize: '4rem',
                      filter: 'drop-shadow(0 0 10px #667eea)'
                    }}
                  >
                    🎉
                  </div>
                </div>
                
                <h2 
                  className="fw-bold mb-3"
                  style={{
                    background: 'linear-gradient(45deg, #ff6b6b, #f9ca24, #a29bfe)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 20px rgba(255,255,255,0.3)'
                  }}
                >
                  ¡Compra Exitosa!
                </h2>
                
                <div 
                  className="rounded p-3 mb-3 mx-auto"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    maxWidth: '400px'
                  }}
                >
                  <h4 className="text-white mb-2">¡Bienvenido a la familia G-Zone!</h4>
                  <p className="mb-1 text-light">Tu pedido está siendo procesado</p>
                  <p className="mb-0 h5 text-warning">
                    <strong>Total: ${totalCarrito.toFixed(2)}</strong>
                  </p>
                </div>

                <div 
                  className="rounded p-3 mb-3 mx-auto"
                  style={{
                    background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                    border: '1px solid #667eea',
                    maxWidth: '400px'
                  }}
                >
                  <h5 className="text-info mb-2">📦 Detalles del envío:</h5>
                  <p className="mb-1 small text-light">• Tu pedido llegará en 2-3 días</p>
                  <p className="mb-0 small text-light">• Recibirás tracking por email</p>
                </div>

                <div className="text-muted small">
                  <p className="mb-0">¡Prepara tu consola! La aventura está por comenzar 🚀</p>
                </div>
              </div>

              {/* Footer */}
              <div 
                className="modal-footer border-0 justify-content-center"
                style={{
                  background: 'linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%)',
                  borderRadius: '0 0 10px 10px'
                }}
              >
                <button 
                  className="btn btn-primary btn-lg px-4 fw-bold"
                  onClick={handleCerrarConfirmacion}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  🎯 Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CONTENIDO NORMAL DEL CARRITO */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛒 Carrito de Compras</h2>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={vaciarCarrito}
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Juego</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      className="rounded me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <strong>{item.nombre}</strong>
                      <br />
                      <small className="text-muted">
                        {item.plataforma} • {item.categoria}
                      </small>
                    </div>
                  </div>
                </td>
                <td className="align-middle">${item.precio}</td>
                <td className="align-middle">
                  <div className="btn-group btn-group-sm" role="group">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      -
                    </button>
                    <span className="btn btn-outline-secondary disabled">
                      {item.cantidad}
                    </span>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => agregarAlCarrito(item)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="align-middle">
                  <strong>${(item.precio * item.cantidad).toFixed(2)}</strong>
                </td>
                <td className="align-middle">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-active">
            <tr>
              <td colSpan="3" className="text-end">
                <strong>Total del Carrito:</strong>
              </td>
              <td colSpan="2">
                <strong className="h5 text-success">
                  ${totalCarrito.toFixed(2)}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <a href="/catalogo" className="btn btn-outline-primary">
          ← Seguir Comprando
        </a>
        <button 
          className="btn btn-success btn-lg px-4 fw-bold"
          onClick={handleProcederPago}
        >
          🎉 Proceder al Pago 💳
        </button>
      </div>
    </div>
  );
}

export default Carrito;