import { useState, useEffect } from 'react';
import { reviewService } from '../servicios/reviewService';
import { useAuth } from '../contexto/AuthContext';
import { useNavigate } from 'react-router-dom';

function Reseñas({ juegoId }) {
  const [reviews, setReviews] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaReview, setNuevaReview] = useState({ rating: 5, comentario: '' });
  const [editandoReview, setEditandoReview] = useState(null);
  const [reviewEditada, setReviewEditada] = useState({ rating: 5, comentario: '' });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cargarReviews();
  }, [juegoId]);

  const cargarReviews = async () => {
    try {
      const data = await reviewService.obtenerReviewsPorJuego(juegoId);
      setReviews(data.reviews);
      setPromedio(data.promedio);
    } catch (error) {
      console.error('Error cargando reviews:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {  
      navigate('/login');
      return;
    }

    try {
      await reviewService.crearReview({
        juegoId,
        rating: nuevaReview.rating,
        comentario: nuevaReview.comentario
      });
      
      setNuevaReview({ rating: 5, comentario: '' });
      setMostrarFormulario(false);
      cargarReviews();
    } catch (error) {
      alert(error.mensaje || 'Error creando reseña');
    }
  };
  const handleModificarReview = async (e) => {
    e.preventDefault();
    try {
      await reviewService.modificarReview(editandoReview._id, {
        rating: reviewEditada.rating,
        comentario: reviewEditada.comentario
      });
      
      setEditandoReview(null);
      setReviewEditada({ rating: 5, comentario: '' });
      cargarReviews();
    } catch (error) {
      alert(error.mensaje || 'Error modificando reseña');
    }
  };

  const renderEstrellas = (rating, interactive = false, onRatingChange = null) => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        className={`${interactive ? 'cursor-pointer' : ''} ${
          star <= rating ? 'text-warning' : 'text-secondary'
        }`}
        onClick={() => interactive && onRatingChange && onRatingChange(star)}
        style={{ cursor: interactive ? 'pointer' : 'default', fontSize: '1.5rem' }}
      >
        {star <= rating ? '⭐' : '☆'}
      </span>
    ));
  };

  if (cargando) {
    return <div className="text-center">Cargando reseñas...</div>;
  }

  return (
    <div>
      <div className="text-center py-4 border-bottom">
        <div className="h1 text-warning">{promedio}</div>
        <div className="mb-2">
          {renderEstrellas(Math.round(promedio))}
        </div>
        <small className="text-muted">
          Basado en {reviews.length} reseñas
        </small>
        <div className="mt-3">
          {user ? (  
            <button 
              className="btn btn-primary me-2"
              onClick={() => setMostrarFormulario(true)}
            >
              Escribir Reseña
            </button>
          ) : (
            <button 
              className="btn btn-primary me-2"
              onClick={() => navigate('/login')}
            >
              Inicia sesión para reseñar
            </button>
          )}
          <button className="btn btn-outline-secondary">
            Ver todas
          </button>
        </div>
      </div>

      {mostrarFormulario && user && (  
        <div className="card mt-4">
          <div className="card-body">
            <h6>Escribir Reseña</h6>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-3">
                <label className="form-label">Calificación:</label>
                <div>
                  {renderEstrellas(nuevaReview.rating, true, (rating) => 
                    setNuevaReview({...nuevaReview, rating})
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Comentario:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={nuevaReview.comentario}
                  onChange={(e) => setNuevaReview({...nuevaReview, comentario: e.target.value})}
                  maxLength="500"
                  required
                />
                <small className="text-muted">
                  {nuevaReview.comentario.length}/500 caracteres
                </small>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  Publicar Reseña
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
       {editandoReview && (
        <div className="card mt-4 border-warning">
          <div className="card-body">
            <h6>✏️ Modificar Reseña</h6>
            <form onSubmit={handleModificarReview}>
              <div className="mb-3">
                <label className="form-label">Calificación:</label>
                <div>
                  {renderEstrellas(reviewEditada.rating, true, (rating) => 
                    setReviewEditada({...reviewEditada, rating})
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Comentario:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={reviewEditada.comentario}
                  onChange={(e) => setReviewEditada({...reviewEditada, comentario: e.target.value})}
                  maxLength="500"
                  required
                />
                <small className="text-muted">
                  {reviewEditada.comentario.length}/500 caracteres
                </small>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-warning">
                  💾 Guardar Cambios
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setEditandoReview(null)}
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-4">
        {reviews.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{review.usuario.nombre}</h6>
                    <div className="mb-2">
                      {renderEstrellas(review.rating)}
                    </div>
                  </div>
                  <small className="text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
               <p className="mb-0">{review.comentario}</p>
                {user && user.id === review.usuario._id && (
                  <div className="mt-2">
                    <button 
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => {
                        setEditandoReview(review);
                        setReviewEditada({ 
                          rating: review.rating, 
                          comentario: review.comentario 
                        });
                      }}
                    >
                      ✏️ Modificar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={async () => {
                        if (confirm('¿Eliminar esta reseña?')) {
                          try {
                            await reviewService.eliminarReview(review._id);
                            cargarReviews();
                          } catch (error) {
                            alert(error.mensaje);
                          }
                        }
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reseñas;