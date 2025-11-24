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
    totalCarrito, 
    realizarCompra
  } = useCarrito();

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
  const [mostrarConfirmacionVaciar, setMostrarConfirmacionVaciar] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [compraProcesada, setCompraProcesada] = useState(false);
  const [totalCompra, setTotalCompra] = useState(0);

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
      setTotalCompra(totalCarrito);
      setMostrarConfirmacion(true);
      lanzarConfeti();
      setCompraProcesada(true);
      
      const resultado = await realizarCompra();
      
      if (!resultado.success) {
        setMostrarConfirmacion(false);
        setCompraProcesada(false);
        mostrarAlertaTemporal('❌ Error: ' + resultado.message);
      }
    } catch (error) {
      console.error('Error en el proceso de compra:', error);
      setMostrarConfirmacion(false);
      setCompraProcesada(false);
      mostrarAlertaTemporal('❌ Error al procesar la compra');
    }
  };

  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
    setCompraProcesada(false);
    setTotalCompra(0);
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

  const impuestos = totalCarrito * 0.16;
  const totalFinal = totalCarrito + impuestos;

  if (carrito.length === 0 && !compraProcesada) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            {/* ICONO GRANDE */}
            <div className="mb-4">
              <i className="fas fa-shopping-cart" 
                 style={{ 
                   fontSize: '8rem', 
                   color: '#dee2e6',
                   position: 'relative'
                 }}>
              </i>
              <div style={{
                position: 'relative',
                top: '-80px',
                left: '20px'
              }}>
                <i className="fas fa-times-circle text-danger" 
                   style={{ fontSize: '3rem' }}>
                </i>
              </div>
            </div>

            {/* TEXTO */}
            <h3 className="fw-bold mb-3">¡Su carrito está vacío ahora mismo!</h3>
            <p className="text-muted mb-4">
              ¿No sabes por dónde empezar?<br />
              Explora nuestra tienda y descubre productos increíbles que te encantarán.
            </p>

            {/* BOTÓN */}
            <a 
              href="/catalogo" 
              className="btn btn-lg fw-bold text-white px-5 py-3"
              style={{ 
                backgroundColor: '#ff5722',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              VOLVER A LA TIENDA
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {}
      {mostrarConfirmacion && (
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
                  <p className="mb-0 fw-bold">Total: ${totalCompra.toFixed(2)}</p>
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

      {}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Tu Carrito de Compra</h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#6c63ff', marginTop: '8px' }}></div>
        </div>
        <button 
          className="btn btn-outline-danger"
          onClick={handleVaciarCarrito}
        >
          <i className="fas fa-trash-alt me-2"></i>
          Vaciar Carrito
        </button>
      </div>

      <div className="row">
        {/* COLUMNA IZQUIERDA - PRODUCTOS */}
        <div className="col-lg-8">
          {carrito.map(item => (
            <div key={item.id} className="card mb-3 shadow-sm border-0">
              <div className="card-body">
                <div className="row align-items-center">
                  {/* IMAGEN */}
                  <div className="col-md-2 text-center">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre}
                      className="img-fluid rounded"
                      style={{ maxHeight: '80px', objectFit: 'cover' }}
                    />
                  </div>

                  {/* NOMBRE Y PLATAFORMA */}
                  <div className="col-md-4">
                    <h6 className="mb-1 fw-bold">{item.nombre}</h6>
                    <small className="text-muted">{item.plataforma}</small>
                  </div>

                  {/* PRECIO */}
                  <div className="col-md-2 text-center">
                    <p className="mb-0 fw-bold">${item.precio}</p>
                  </div>

                  {/* CANTIDAD */}
                  <div className="col-md-2 text-center">
                    <div className="btn-group btn-group-sm" role="group">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => quitarDelCarrito(item.id)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="btn btn-outline-secondary disabled" style={{ minWidth: '45px' }}>
                        {item.cantidad}
                      </span>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => agregarAlCarrito(item)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* ELIMINAR */}
                  <div className="col-md-2 text-center">
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleEliminarProducto(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COLUMNA DERECHA - RESUMEN */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="fw-bold mb-4">Resumen del Pedido</h5>

              {/* SUBTOTAL */}
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span className="fw-bold">${totalCarrito.toFixed(2)}</span>
              </div>

              {/* IMPUESTOS */}
              <div className="d-flex justify-content-between mb-2">
                <span>Impuestos (16%)</span>
                <span className="fw-bold">${impuestos.toFixed(2)}</span>
              </div>

              {/* ENVÍO */}
              <div className="d-flex justify-content-between mb-3">
                <span>Envío</span>
                <span className="text-success fw-bold">Gratis</span>
              </div>

              <hr />

              {/* TOTAL */}
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Total</h5>
                <h5 className="fw-bold">${totalFinal.toFixed(2)}</h5>
              </div>

              {/* BOTÓN CHECKOUT */}
              <button 
                className="btn btn-primary w-100 py-3 fw-bold mb-3"
                onClick={handleProcederPago}
                style={{ backgroundColor: '#6c63ff', border: 'none' }}
              >
                Proceder al Pago
              </button>

              {/* BOTÓN CONTINUAR */}
              <a 
                href="/catalogo" 
                className="btn btn-outline-primary w-100"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Continuar Comprando
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;