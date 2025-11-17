const Review = require('../models/Review');

// Crear nueva reseña
const crearReview = async (req, res) => {
  try {
    const { juegoId, rating, comentario } = req.body;
    const usuario = req.userId; 

    const reviewExistente = await Review.findOne({ usuario, juegoId });
    if (reviewExistente) {
      return res.status(400).json({ 
        mensaje: 'Ya has escrito una reseña para este juego' 
      }); 
    }

    const nuevaReview = new Review({
      usuario,
      juegoId,
      rating,
      comentario
    });

    await nuevaReview.save();
    
    // Populate para obtener datos del usuario
    const reviewCompleta = await Review.findById(nuevaReview._id)
      .populate('usuario', 'nombre email');

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      review: reviewCompleta
    });
  } catch (error) {
    console.error('Error creando reseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Obtener reseñas por juego
const obtenerReviewsPorJuego = async (req, res) => {
  try {
    const { juegoId } = req.params;

    const reviews = await Review.find({ juegoId })
      .populate('usuario', 'nombre')
      .sort({ createdAt: -1 });

    // Calcular promedio de ratings
    const promedio = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    res.json({
      reviews,
      promedio: promedio.toFixed(1),
      total: reviews.length
    });
  } catch (error) {
    console.error('Error obteniendo reseñas:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Eliminar reseña
const eliminarReview = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.userId;

    const review = await Review.findOne({ _id: id, usuario });
    if (!review) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }

    await Review.findByIdAndDelete(id);
    res.json({ mensaje: 'Reseña eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando reseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};


module.exports = {
  crearReview,
  obtenerReviewsPorJuego,
  eliminarReview
};
