const express = require('express');
const { crearTicket, obtenerTicketsUsuario, obtenerTicketPorId } = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta pública para crear tickets
router.post('/crear', crearTicket);

// Rutas protegidas para usuarios autenticados
router.get('/mis-tickets', authMiddleware, obtenerTicketsUsuario);
router.get('/:id', authMiddleware, obtenerTicketPorId);

module.exports = router;