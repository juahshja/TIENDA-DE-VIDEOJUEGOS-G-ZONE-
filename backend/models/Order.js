const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  juegos: [{
    juegoId: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      default: 1
    },
    imagen: {
      type: String,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    default: 'Completado',
    enum: ['Completado', 'Pendiente', 'Cancelado']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);