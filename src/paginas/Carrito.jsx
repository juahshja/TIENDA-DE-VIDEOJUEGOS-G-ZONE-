import { useCarrito } from '../contexto/CarritoContext';
import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';


function Carrito() {
  const { 
    carrito, 
    agregarAlCarrito, 
    quitarDelCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito,
    totalCarrito, 
    realizarCompra
  } = useCarrito();

  
  
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
  const [mostrarConfirmacionVaciar, setMostrarConfirmacionVaciar] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  
  const mostrarConfirmacionRef = useRef(false);

  useEffect(() => {
    mostrarConfirmacionRef.current = mostrarConfirmacion;
  }, [mostrarConfirmacion]);

  const lanzarConfeti = () => {
    confetti({
      particleCount: 400,
      spread: 200,
      origin: { y: 0.3 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6b6b', '#4ecdc4'],
      zIndex: 10000
    });

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

  const handleProcederPago = async () => {
  try {
    // MOSTRAR MODAL INMEDIATAMENTE
    setMostrarConfirmacion(true);
    lanzarConfeti();
    
    // PROCESAR COMPRA EN SEGUNDO PLANO
    const resultado = await realizarCompra();
    
    if (!resultado.success) {
      // Si hay error, mantener el modal abierto pero mostrar alerta
      mostrarAlertaTemporal('❌ Error: ' + resultado.message);
    }
    // Si es éxito, el modal permanece abierto
  } catch (error) {
    console.error('Error en el proceso de compra:', error);
    mostrarAlertaTemporal('❌ Error al procesar la compra');
  }
};

  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
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
            <h4 className="alert-heading">
              <i className="fas fa-shopping-cart me-2"></i>
              Tu carrito está vacío
            </h4>
            <p>¡Explora nuestro catálogo y descubre juegos increíbles!</p>
          </div>
        </div>
      </div>
    );
  }

  const shouldShowModal = mostrarConfirmacion || mostrarConfirmacionRef.current;

  return (
    <div className="container mt-4">
      {shouldShowModal && (
        <div className="modal fade show d-block" style={{
          backgroundColor: 'rgba(0,0,0,0.6)', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 9999
        }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="fas fa-check-circle me-2"></i>
                  Compra Exitosa
                </h5>
              </div>
              
              <div className="modal-body">
                <div className="text-center mb-3">
                  <i className="fas fa-check-circle text-success" style={{fontSize: '3rem'}}></i>
                  <h6 className="text-dark mt-2">¡Bienvenido a la familia G-Zone!</h6>
                </div>
                
                <div className="alert alert-light border mb-3">
                  <p className="mb-1">Tu pedido está siendo procesado</p>
                  <p className="mb-0 fw-bold">Total: ${totalCarrito.toFixed(2)}</p>
                </div>

                <div className="card border-0 bg-light">
                  <div className="card-body py-2">
                    <h6 className="card-title mb-2">
                      <i className="fas fa-box me-1"></i>
                      Detalles del envío:
                    </h6>
                    <ul className="list-unstyled small mb-0">
                      <li><i className="fas fa-clock me-1"></i> Tu pedido llegará en 2-3 días</li>
                      <li><i className="fas fa-envelope me-1"></i> Recibirás tracking por email</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
               <button 
  className="btn btn-primary"
  onClick={handleCerrarConfirmacion}
>
  <i className="fas fa-check me-1"></i>
  Cerrar Compra
</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarConfirmacionEliminar && productoAEliminar && (
        <div className="modal fade show d-block" data-bs-backdrop="static" data-bs-keyboard="false" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
                  Confirmar eliminación
                </h5>
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
                  <i className="fas fa-times me-1"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmarEliminarProducto}
                >
                  <i className="fas fa-trash me-1"></i>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarConfirmacionVaciar && (
        <div className="modal fade show d-block" data-bs-backdrop="static" data-bs-keyboard="false" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
                  Vaciar carrito
                </h5>
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
                  <i className="fas fa-times me-1"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmarVaciarCarrito}
                >
                  <i className="fas fa-broom me-1"></i>
                  Sí, vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-shopping-cart me-2"></i>
          Carrito de Compras
        </h2>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={handleVaciarCarrito}
        >
          <i className="fas fa-broom me-1"></i>
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
                        <i className="fas fa-gamepad me-1"></i>
                        {item.plataforma} • {item.categoria}
                      </small>
                    </div>
                  </div>
                </td>
                <td className="align-middle">
                  <i className="fas fa-tag me-1 text-muted"></i>
                  ${item.precio}
                </td>
                <td className="align-middle">
                  <div className="btn-group btn-group-sm" role="group">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="btn btn-outline-secondary disabled">
                      {item.cantidad}
                    </span>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => agregarAlCarrito(item)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="align-middle">
                  <strong>
                    <i className="fas fa-dollar-sign me-1 text-success"></i>
                    {(item.precio * item.cantidad).toFixed(2)}
                  </strong>
                </td>
                <td className="align-middle">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminarProducto(item)}
                  >
                    <i className="fas fa-trash me-1"></i>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-active">
            <tr>
              <td colSpan="3" className="text-end">
                <strong>
                  <i className="fas fa-receipt me-1"></i>
                  Total del Carrito:
                </strong>
              </td>
              <td colSpan="2">
                <strong className="h5 text-success">
                  <i className="fas fa-dollar-sign me-1"></i>
                  {totalCarrito.toFixed(2)}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <a href="/catalogo" className="btn btn-outline-primary">
          <i className="fas fa-arrow-left me-1"></i>
          Seguir Comprando
        </a>
        <button 
          className="btn btn-success btn-lg px-4 fw-bold"
          onClick={handleProcederPago}
        >
          <i className="fas fa-credit-card me-2"></i>
          Proceder al Pago
          <i className="fas fa-gift ms-2"></i>
        </button>
      </div>
    </div>
  );
}

export default Carrito;