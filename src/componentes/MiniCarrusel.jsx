import { useState } from 'react';

function MiniCarrusel({ imagenes }) {
  const [imagenActual, setImagenActual] = useState(0);

  // Función para siguiente imagen
  const siguienteImagen = () => {
    setImagenActual((prev) => 
      prev === imagenes.length - 1 ? 0 : prev + 1
    );
  };

  // Función para imagen anterior
  const anteriorImagen = () => {
    setImagenActual((prev) => 
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  // Función para seleccionar imagen específica
  const seleccionarImagen = (index) => {
    setImagenActual(index);
  };

  // Si no hay imágenes o solo hay una, mostrar simple
  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="product-image-detalle text-center">
        <div className="alert alert-warning">
          No hay imágenes disponibles
        </div>
      </div>
    );
  }

  if (imagenes.length === 1) {
    return (
      <div className="product-image-detalle">
        <img 
          src={imagenes[0]} 
          alt="Producto"
          className="img-fluid rounded shadow"
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'contain',
            backgroundColor: '#f8f9fa'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400/64748b/ffffff?text=Imagen+No+Disponible';
          }}
        />
      </div>
    );
  }

  return (
    <div className="mini-carrusel">
      {/* CONTENEDOR PRINCIPAL CON IMAGEN GRANDE */}
      <div className="imagen-principal position-relative mb-3">
        
        {/* IMAGEN PRINCIPAL */}
        <img 
          src={imagenes[imagenActual]} 
          alt={`Vista ${imagenActual + 1} del producto`}
          className="img-fluid rounded shadow"
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'contain',
            backgroundColor: '#f8f9fa',
            transition: 'opacity 0.3s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400/64748b/ffffff?text=Imagen+No+Disponible';
          }}
        />
        
        {/* BOTÓN ANTERIOR (←) */}
        <button 
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle shadow-sm border-0"
          onClick={anteriorImagen}
          style={{ 
            width: '45px', 
            height: '45px',
            zIndex: 10
          }}
          aria-label="Imagen anterior"
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>‹</span>
        </button>

        {/* BOTÓN SIGUIENTE (→) */}
        <button 
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle shadow-sm border-0"
          onClick={siguienteImagen}
          style={{ 
            width: '45px', 
            height: '45px',
            zIndex: 10
          }}
          aria-label="Siguiente imagen"
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>›</span>
        </button>

        {/* INDICADOR DE POSICIÓN (1/4) */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
          <span className="badge bg-dark bg-opacity-75 px-3 py-2">
            {imagenActual + 1} / {imagenes.length}
          </span>
        </div>
      </div>

      {/* FILA DE MINIATURAS */}
      <div className="miniaturas d-flex justify-content-center gap-2 flex-wrap">
        {imagenes.map((imagen, index) => (
          <div 
            key={index}
            className={`position-relative ${index === imagenActual ? 'miniatura-activa' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={imagen}
              alt={`Miniatura ${index + 1}`}
              className={`img-thumbnail ${index === imagenActual ? 'border-primary border-2' : 'border-secondary'}`}
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'cover',
                opacity: index === imagenActual ? 1 : 0.6,
                transition: 'all 0.2s ease'
              }}
              onClick={() => seleccionarImagen(index)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/70x70/64748b/ffffff?text=X';
              }}
            />
            {/* Indicador de miniatura activa */}
            {index === imagenActual && (
              <div className="position-absolute top-0 start-50 translate-middle-x mt-1">
                <div className="bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCarrusel;