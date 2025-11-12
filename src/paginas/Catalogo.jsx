import { useState, useEffect } from 'react';
import { obtenerJuegos } from '../servicios/juegosService';
import JuegoCard from '../componentes/JuegoCard';

function Catalogo() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const data = await obtenerJuegos();
        setJuegos(data);
      } catch (err) {
        setError('Error al cargar los juegos');
        console.error('Error:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarJuegos();
  }, []);

  if (cargando) {
    return (
      <div className="container text-center mt-5 py-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h5 className="text-primary mb-2">Cargando catálogo</h5>
            <p className="text-muted">Buscando los mejores juegos para ti...</p>
          </div>
        </div>
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
          <h2 className="text-center mb-3">🎯 Catálogo de Juegos</h2>
          <p className="text-center text-muted">
           Explora nuestra amplia selección de videojuegos para todas las plataformas. 
Encuentra desde los últimos lanzamientos hasta clásicos imprescindibles.
          </p>
        </div>
      </div>
      
      <div className="row">
        {juegos.map(juego => (
          <JuegoCard key={juego.id} juego={juego} />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;