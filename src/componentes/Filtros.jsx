import { useState } from 'react';

function Filtros({
  onFiltrosChange,
  filtrosActivos,
  onLimpiarFiltros
}) {
  const [filtrosLocales, setFiltrosLocales] = useState({
    generos: [],
    plataformas: [],
    precioMax: 100
  });

  // Géneros disponibles
  const generosDisponibles = [
    'Acción', 'Aventura', 'RPG', 'Deportes', 'Estrategia'
  ];

  // Plataformas disponibles
  const plataformasDisponibles = [
    'PlayStation 5', 'Xbox Series X', 'Nintendo Switch', 'PC'
  ];

  const handleGeneroChange = (genero) => {
    const nuevosGeneros = filtrosLocales.generos.includes(genero)
      ? filtrosLocales.generos.filter(g => g !== genero)
      : [...filtrosLocales.generos, genero];
    
    const nuevosFiltros = { ...filtrosLocales, generos: nuevosGeneros };
    setFiltrosLocales(nuevosFiltros);
  };

  const handlePlataformaChange = (plataforma) => {
    const nuevasPlataformas = filtrosLocales.plataformas.includes(plataforma)
      ? filtrosLocales.plataformas.filter(p => p !== plataforma)
      : [...filtrosLocales.plataformas, plataforma];
    
    const nuevosFiltros = { ...filtrosLocales, plataformas: nuevasPlataformas };
    setFiltrosLocales(nuevosFiltros);
  };

  const handlePrecioChange = (e) => {
    const nuevosFiltros = { ...filtrosLocales, precioMax: parseInt(e.target.value) };
    setFiltrosLocales(nuevosFiltros);
  };

  const aplicarFiltros = () => {
    // Convertir filtros simples al formato que espera Catalogo.jsx
    const filtrosParaCatalogo = {
      plataformas: filtrosLocales.plataformas,
      precioMax: filtrosLocales.precioMax,
      generos: filtrosLocales.generos
    };
    
    onFiltrosChange && onFiltrosChange(filtrosParaCatalogo);
  };

  const limpiarTodo = () => {
    // Limpiar filtros locales
    setFiltrosLocales({
      generos: [],
      plataformas: [],
      precioMax: 100
    });
    
    // Limpiar filtros en el componente padre
    onLimpiarFiltros && onLimpiarFiltros();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">Filtros</h5>
        
        {/* Géneros */}
        <div className="mb-4">
          <h6 className="fw-bold text-primary mb-3">Género</h6>
          <div className="d-flex flex-column gap-2">
            {generosDisponibles.map(genero => (
              <div key={genero} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`genero-${genero}`}
                  checked={filtrosLocales.generos.includes(genero)}
                  onChange={() => handleGeneroChange(genero)}
                />
                <label className="form-check-label" htmlFor={`genero-${genero}`}>
                  {genero}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Plataformas */}
        <div className="mb-4">
          <h6 className="fw-bold text-primary mb-3">Plataforma</h6>
          <div className="d-flex flex-column gap-2">
            {plataformasDisponibles.map(plataforma => (
              <div key={plataforma} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`plataforma-${plataforma}`}
                  checked={filtrosLocales.plataformas.includes(plataforma)}
                  onChange={() => handlePlataformaChange(plataforma)}
                />
                <label className="form-check-label" htmlFor={`plataforma-${plataforma}`}>
                  {plataforma}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rango de Precio */}
        <div className="mb-4">
          <h6 className="fw-bold text-primary mb-3">Rango de Precio</h6>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="small">Hasta ${filtrosLocales.precioMax}</span>
          </div>
          <input
            type="range"
            className="form-range"
            min="0"
            max="100"
            step="10"
            value={filtrosLocales.precioMax}
            onChange={handlePrecioChange}
          />
          <div className="d-flex justify-content-between small text-muted">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>

        {/* Botones de Filtros */}
        <div className="mb-3">
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={aplicarFiltros}
          >
            Aplicar Filtros
          </button>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={limpiarTodo}
          >
            Limpiar Todo
          </button>
        </div>

        {}
        <div className="text-center">
          <small className="text-muted">
            <strong>{filtrosActivos}</strong> filtros activos
          </small>
        </div>
      </div>
    </div>
  );
}

export default Filtros;