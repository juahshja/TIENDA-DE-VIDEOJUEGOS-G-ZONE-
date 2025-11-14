import { useState, useEffect } from 'react';
import { obtenerJuegos } from '../servicios/juegosService';
import JuegoCard from '../componentes/JuegoCard';
import Filtros from '../componentes/Filtros';

function Catalogo() {
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [filtros, setFiltros] = useState({});
  const [mostrarFiltros, setMostrarFiltros] = useState(true); // Ahora siempre visibles
  const [filtrosActivos, setFiltrosActivos] = useState(0);
  const [orden, setOrden] = useState('relevancia');

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const data = await obtenerJuegos();
        setJuegos(data);
        setJuegosFiltrados(data);
      } catch (err) {
        setError('Error al cargar los juegos');
        console.error('Error:', err);
      } finally {
        setCargando(false);
      }
    };
    cargarJuegos();
  }, []);

  // Aplicar filtros simplificados
  useEffect(() => {
    const {
      plataformas = [],
      precioMax = 100,
      generos = []
    } = filtros || {};

    let resultados = Array.isArray(juegos) ? [...juegos] : [];

    // Filtrar por plataformas
    if (Array.isArray(plataformas) && plataformas.length > 0) {
      resultados = resultados.filter(juego => {
        if (Array.isArray(juego.plataformas)) {
          return juego.plataformas.some(p => plataformas.includes(p));
        }
        if (typeof juego.plataforma === 'string') {
          return plataformas.includes(juego.plataforma);
        }
        return false;
      });
    }

    // Filtrar por precio máximo
    if (precioMax < 100) {
      resultados = resultados.filter(juego => {
        const precio = Number(juego.precio || 0);
        return precio <= precioMax;
      });
    }

    // Filtrar por géneros (si existe la propiedad genero en los juegos)
    if (Array.isArray(generos) && generos.length > 0) {
      resultados = resultados.filter(juego => {
        if (juego.genero) {
          return generos.includes(juego.genero);
        }
        if (juego.categoria) {
          return generos.includes(juego.categoria);
        }
        return false;
      });
    }

    // Aplicar ordenamiento
    switch (orden) {
      case 'precio-asc':
        resultados.sort((a, b) => (a.precio || 0) - (b.precio || 0));
        break;
      case 'precio-desc':
        resultados.sort((a, b) => (b.precio || 0) - (a.precio || 0));
        break;
      case 'nombre':
        resultados.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
        break;
      default:
        // relevancia - mantener orden original
        break;
    }

    setJuegosFiltrados(resultados);

    // Calcular filtros activos
    const activos = calcularFiltrosActivos(filtros);
    setFiltrosActivos(activos);
  }, [filtros, juegos, orden]);

  const calcularFiltrosActivos = (filtros) => {
    if (!filtros || Object.keys(filtros).length === 0) return 0;
    let count = 0;
    if (Array.isArray(filtros.plataformas) && filtros.plataformas.length > 0) count++;
    if (filtros.precioMax && filtros.precioMax < 100) count++;
    if (Array.isArray(filtros.generos) && filtros.generos.length > 0) count++;
    return count;
  };

  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros || {});
  };

  const handleLimpiarFiltros = () => {
    setFiltros({});
    setOrden('relevancia');
  };

  if (cargando) {
    return (
      <div className="container text-center mt-5 py-4">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h5 className="text-primary mb-2">Cargando catálogo</h5>
        <p className="text-muted">Buscando los mejores juegos para ti...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-center mb-3">🎮 Catálogo de Juegos</h2>
          <p className="text-center text-muted">
            Explora nuestra amplia selección con filtros
          </p>
        </div>
      </div>

      <div className="row">
        {/* Columna de Filtros - Siempre visible */}
        <div className="col-lg-3 mb-4">
          <Filtros
            onFiltrosChange={handleFiltrosChange}
            filtrosActivos={filtrosActivos}
            onLimpiarFiltros={handleLimpiarFiltros}
          />
        </div>

        {/* Columna de Juegos */}
        <div className="col-lg-9">
          {/* Barra de herramientas */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="text-muted">
              <small>
                Mostrando {juegosFiltrados.length} de {juegos.length} juegos
              </small>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted small">Ordenar por:</span>
              <select 
                className="form-select form-select-sm"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="nombre">Nombre</option>
              </select>
            </div>
          </div>

          {/* Grid de Juegos */}
          <div className="row">
            {juegosFiltrados.map(juego => (
              <JuegoCard key={juego.id} juego={juego} />
            ))}
          </div>

          {juegosFiltrados.length === 0 && (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-search display-1 text-muted"></i>
              </div>
              <h4 className="text-muted">No se encontraron juegos</h4>
              <p className="text-muted mb-4">
                Intenta ajustar los filtros para ver más resultados
              </p>
              <button
                className="btn btn-primary"
                onClick={handleLimpiarFiltros}
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;