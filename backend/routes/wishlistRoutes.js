const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET /api/wishlist - Obtener wishlist
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist - Agregar a wishlist
router.post('/', wishlistController.addToWishlist);

// DELETE /api/wishlist/:gameId - Eliminar de wishlist
router.delete('/:gameId', wishlistController.removeFromWishlist);

// DELETE /api/wishlist - Limpiar toda la wishlist
router.delete('/', wishlistController.clearWishlist);

// GET /api/wishlist/check/:gameId - Verificar si está en wishlist
router.get('/check/:gameId', wishlistController.checkInWishlist);

module.exports = router;