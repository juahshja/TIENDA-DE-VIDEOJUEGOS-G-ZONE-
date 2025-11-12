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
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
  const [mostrarConfirmacionVaciar, setMostrarConfirmacionVaciar] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [productoAEliminar, setProductoAEliminar] = useState(null);

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

  const mostrarAlertaTemporal = (mensaje) => {
    setMensajeAlerta(mensaje);
    setMostrarAlerta(true);
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  const handleProcederPago = () => {
    setMostrarConfirmacion(true);
    lanzarConfeti();
  };

  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
    vaciarCarrito();
  };

  const handleEliminarProducto = (producto) => {
    setProductoAEliminar(producto);
    setMostrarConfirmacionEliminar(true);
  };

  const confirmarEliminarProducto = () => {
    if (productoAEliminar) {
      eliminarDelCarrito(productoAEliminar.id);
      mostrarAlertaTemporal(`"${productoAEliminar.nombre}" fue eliminado del carrito`);
    }
    setMostrarConfirmacionEliminar(false);
    setProductoAEliminar(null);
  };

  const handleVaciarCarrito = () => {
    setMostrarConfirmacionVaciar(true);
  };

  const confirmarVaciarCarrito = () => {
    vaciarCarrito();
    setMostrarConfirmacionVaciar(false);
    mostrarAlertaTemporal('Carrito vaciado correctamente');
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
 
      {/* MODAL DE CONFIRMACIÓN COMPRA EXITOSA */}
      {mostrarConfirmacion && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.6)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Compra Exitosa
                </h5>
              </div>
              
              <div className="modal-body">
                <div className="text-center mb-3">
                  <i className="bi bi-check2-circle text-success" style={{fontSize: '3rem'}}></i>
                  <h6 className="text-dark mt-2">¡Bienvenido a la familia G-Zone!</h6>
                </div>
                
                <div className="alert alert-light border mb-3">
                  <p className="mb-1">Tu pedido está siendo procesado</p>
                  <p className="mb-0 fw-bold">Total: ${totalCarrito.toFixed(2)}</p>
                </div>

                <div className="card border-0 bg-light">
                  <div className="card-body py-2">
                    <h6 className="card-title mb-2">
                      <i className="bi bi-box-seam me-1"></i>
                      Detalles del envío:
                    </h6>
                    <ul className="list-unstyled small mb-0">
                      <li><i className="bi bi-clock me-1"></i> Tu pedido llegará en 2-3 días</li>
                      <li><i className="bi bi-envelope me-1"></i> Recibirás tracking por email</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn btn-primary"
                  onClick={handleCerrarConfirmacion}
                >
                  <i className="bi bi-cart-plus me-1"></i>
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN ELIMINAR PRODUCTO - FONDO ESTÁTICO */}
      {mostrarConfirmacionEliminar && productoAEliminar && (
        <div className="modal fade show d-block" data-bs-backdrop="static" data-bs-keyboard="false" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que quieres eliminar <strong>"{productoAEliminar.nombre}"</strong> del carrito?</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setMostrarConfirmacionEliminar(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmarEliminarProducto}
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN VACIAR CARRITO - FONDO ESTÁTICO */}
      {mostrarConfirmacionVaciar && (
        <div className="modal fade show d-block" data-bs-backdrop="static" data-bs-keyboard="false" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vaciar carrito</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que quieres vaciar todo el carrito? Se eliminarán <strong>{carrito.length}</strong> producto(s).</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setMostrarConfirmacionVaciar(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmarVaciarCarrito}
                >
                  Sí, vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO NORMAL DEL CARRITO */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛒 Carrito de Compras</h2>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={handleVaciarCarrito}
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
                    onClick={() => handleEliminarProducto(item)}
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