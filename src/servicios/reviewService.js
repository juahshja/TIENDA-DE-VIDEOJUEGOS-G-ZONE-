import api from './api';

export const reviewService = {
  // Crear nueva reseña
  crearReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error creando reseña' };
    }
  },

  // Obtener reseñas por juego
  obtenerReviewsPorJuego: async (juegoId) => {
    try {
      const response = await api.get(`/reviews/juego/${juegoId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error obteniendo reseñas' };
    }
  },

  // Eliminar reseña
  eliminarReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error eliminando reseña' };
    }
    
  }
};