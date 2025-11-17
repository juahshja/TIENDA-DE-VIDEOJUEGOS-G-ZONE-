const express = require('express');
const router = express.Router();
const { 
  crearReview, 
  obtenerReviewsPorJuego, 
  eliminarReview 
} = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.post('/', authMiddleware, crearReview);
router.delete('/:id', authMiddleware, eliminarReview);

// RUTA PUBLICA
router.get('/juego/:juegoId', obtenerReviewsPorJuego);


module.exports = router;