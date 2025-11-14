import { useEffect } from 'react';

const Notificacion = ({ mensaje, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div 
      className="border-0 rounded p-2 mb-2 d-flex justify-content-between align-items-center shadow-sm animate-slide-up"
      style={{ 
        backgroundColor: '#76df86ff',
        color: '#000000'
      }}
    >
      <span className="small">
        <strong>{mensaje}</strong>
      </span>
      <button 
        type="button" 
        className="btn-close btn-close-sm" 
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Notificacion;