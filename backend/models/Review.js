const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  juegoId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  likes: {
    type: Number,
    default: 0
  },
  reportado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Evitar reseñas duplicadas del mismo usuario para el mismo juego
reviewSchema.index({ usuario: 1, juegoId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);