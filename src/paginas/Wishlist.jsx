import { useWishlist } from '../contexto/WishlistContext';
import { useAuth } from '../contexto/AuthContext';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { wishlist, loading, eliminarJuegoWishlist, cantidadWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning" role="alert">
          <h4>⚠️ Debes iniciar sesión</h4>
          <p>Para ver tu lista de deseos, primero debes iniciar sesión.</p>
          <Link to="/login" className="btn btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center mt-5 py-4">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h5 className="text-primary">Cargando tu lista de deseos...</h5>
      </div>
    );
  }

  const handleEliminar = async (gameId, gameName) => {
    if (window.confirm(`¿Eliminar "${gameName}" de tu lista de deseos?`)) {
      await eliminarJuegoWishlist(gameId);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold">
            <i className="fas fa-heart text-danger me-2"></i>
            Mi Lista de Deseos
          </h2>
          <p className="text-muted">
            {cantidadWishlist > 0 
              ? `Tienes ${cantidadWishlist} ${cantidadWishlist === 1 ? 'juego' : 'juegos'} en tu lista` 
              : 'Tu lista de deseos está vacía'}
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <i className="far fa-heart display-1 text-muted mb-4"></i>
          <h4 className="text-muted">Tu lista de deseos está vacía</h4>
          <p className="text-muted mb-4">
            Explora nuestro catálogo y agrega tus juegos favoritos
          </p>
          <Link to="/catalogo" className="btn btn-primary">
            <i className="fas fa-gamepad me-2"></i>
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div key={item.gameId} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.gameImage}
                  className="card-img-top"
                  alt={item.gameName}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.gameName}</h5>
                  <p className="card-text text-muted small mb-2">
                    Agregado el {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary fw-bold mb-0">
                        ${item.gamePrice}
                      </span>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/producto/${item.gameId}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Ver Detalles
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(item.gameId, item.gameName)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;