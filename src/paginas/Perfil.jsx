import { useAuth } from '../contexto/AuthContext';
import { useWishlist } from '../contexto/WishlistContext';
import { useCarrito } from '../contexto/CarritoContext';
import { useNavigate, Link } from 'react-router-dom';
import { orderService } from '../servicios/orderService';
import { useState, useEffect } from 'react';

function Perfil() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cantidadWishlist } = useWishlist();
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const [totalJuegosComprados, setTotalJuegosComprados] = useState(0);
  const [cargandoCompras, setCargandoCompras] = useState(true);

  useEffect(() => {
    const cargarOrders = async () => {
      try {
        const data = await orderService.obtenerOrdersUsuario();
        setTotalJuegosComprados(data.totalJuegosComprados);
      } catch (error) {
        console.error('Error cargando órdenes:', error);
        setTotalJuegosComprados(0);
      } finally {
        setCargandoCompras(false);
      }
    };

    if (isAuthenticated) {
      cargarOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning" role="alert">
          <h4>⚠️ Debes iniciar sesión</h4>
          <p>Para ver tu perfil, primero debes iniciar sesión.</p>
          <Link to="/login" className="btn btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                     style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                  {user?.nombre?.charAt(0).toUpperCase()}
                </div>
                <h2 className="fw-bold mb-1">{user?.nombre}</h2>
                <p className="text-muted">{user?.email}</p>
              </div>

              <hr className="my-4" />

              <div className="row text-center mb-4">
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <i className="fas fa-heart text-danger fs-2 mb-2"></i>
                    <h4 className="mb-0">{cantidadWishlist}</h4>
                    <small className="text-muted">Lista de Deseos</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <i className="fas fa-shopping-cart text-success fs-2 mb-2"></i>
                    <h4 className="mb-0">{cantidadTotal}</h4>
                    <small className="text-muted">En Carrito</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <i className="fas fa-gamepad text-primary fs-2 mb-2"></i>
                    <h4 className="mb-0">
                      {cargandoCompras ? (
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                      ) : (
                        totalJuegosComprados
                      )}
                    </h4>
                    <small className="text-muted">Comprados</small>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <Link to="/wishlist" className="btn btn-outline-primary btn-lg">
                  <i className="fas fa-heart me-2"></i>
                  Ver Lista de Deseos
                </Link>
                <Link to="/carrito" className="btn btn-outline-success btn-lg">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Ver Carrito
                </Link>
                <button onClick={handleLogout} className="btn btn-danger btn-lg">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;