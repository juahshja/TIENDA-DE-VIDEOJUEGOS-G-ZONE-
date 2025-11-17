const mongoose = require('mongoose');

const listaDeseosSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  juegos: [{
    gameId: {
      type: String,
      required: true
    },
    gameName: {
      type: String,
      required: true
    },
    gamePrice: {
      type: Number,
      required: true
    },
    gameImage: {
      type: String,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('ListaDeseos', listaDeseosSchema);