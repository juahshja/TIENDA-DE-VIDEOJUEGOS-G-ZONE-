import { useNavigate } from 'react-router-dom';

function ModalLogin({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleRegister = () => {
    onClose();
    navigate('/registro');
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          {/* Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              <i className="fas fa-lock me-2"></i>
              Acceso Requerido
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-center py-4">
            <div className="mb-3">
              <i className="fas fa-shopping-cart fa-2x text-primary mb-3"></i>
            </div>
            <h6 className="fw-bold text-dark mb-2">Inicie sesión para continuar</h6>
            <p className="text-muted small mb-0">
              Necesita una cuenta para agregar productos al carrito y realizar compras.
            </p>
          </div>

          {/* Footer */}
          <div className="modal-footer border-0 pt-0">
            <button 
              className="btn btn-outline-secondary btn-sm me-2" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary btn-sm flex-fill"
                onClick={handleLogin}
              >
                <i className="fas fa-sign-in-alt me-1"></i>
                Iniciar Sesión
              </button>
              <button 
                className="btn btn-success btn-sm flex-fill"
                onClick={handleRegister}
              >
                <i className="fas fa-user-plus me-1"></i>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;