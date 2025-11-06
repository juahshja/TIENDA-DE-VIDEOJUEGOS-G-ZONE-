import { useCarrito } from '../contexto/CarritoContext';

function Carrito() {
  const { 
    carrito, 
    agregarAlCarrito, 
    quitarDelCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito,
    totalCarrito 
  } = useCarrito();

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
        <button className="btn btn-success btn-lg">
          Proceder al Pago 💳
        </button>
      </div>
    </div>
  );
}

export default Carrito;