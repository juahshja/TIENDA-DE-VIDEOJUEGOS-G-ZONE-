const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  asunto: {
    type: String,
    required: [true, 'El asunto es requerido'],
    trim: true
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es requerido'],
    trim: true
  },
  categoria: {
    type: String,
    enum: ['tecnico', 'pago', 'cuenta', 'producto', 'general'],
    default: 'general'
  },
  estado: {
    type: String,
    enum: ['abierto', 'en_progreso', 'cerrado'],
    default: 'abierto'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);