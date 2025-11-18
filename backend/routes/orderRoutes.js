const express = require('express');
const router = express.Router();
const { 
  crearOrder, 
  obtenerOrdersUsuario
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear orden
router.post('/', authMiddleware, crearOrder);

// Ruta para obtener órdenes del usuario
router.get('/usuario', authMiddleware, obtenerOrdersUsuario);

module.exports = router;