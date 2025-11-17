const ListaDeseos = require('../models/ListaDeseos');

// Obtener wishlist del usuario
exports.getWishlist = async (req, res) => {
  try {
    let listaDeseos = await ListaDeseos.findOne({ userId: req.userId });
    
    // Si no existe, crear una vacía
    if (!listaDeseos) {
      listaDeseos = await ListaDeseos.create({ 
        userId: req.userId, 
        juegos: [] 
      });
    }

    res.json({
      success: true,
      wishlist: listaDeseos.juegos,
      count: listaDeseos.juegos.length
    });
  } catch (error) {
    console.error('Error en getWishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener wishlist', 
      error: error.message 
    });
  }
};

// Agregar juego a wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { gameId, gameName, gamePrice, gameImage } = req.body;

    // Validar datos
    if (!gameId || !gameName || !gamePrice || !gameImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      });
    }

    let listaDeseos = await ListaDeseos.findOne({ userId: req.userId });

    // Si no existe, crear la lista
    if (!listaDeseos) {
      listaDeseos = new ListaDeseos({ 
        userId: req.userId, 
        juegos: [] 
      });
    }

    // Verificar si ya está en la wishlist
    const yaExiste = listaDeseos.juegos.some(item => item.gameId === gameId);
    
    if (yaExiste) {
      return res.status(400).json({ 
        success: false, 
        message: 'El juego ya está en tu lista de deseos' 
      });
    }

    // Agregar juego
    listaDeseos.juegos.push({
      gameId,
      gameName,
      gamePrice,
      gameImage,
      addedAt: new Date()
    });

    await listaDeseos.save();

    res.status(201).json({
      success: true,
      message: 'Juego agregado a la lista de deseos',
      wishlist: listaDeseos.juegos,
      count: listaDeseos.juegos.length
    });
  } catch (error) {
    console.error('Error en addToWishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al agregar a wishlist', 
      error: error.message 
    });
  }
};

// Eliminar juego de wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { gameId } = req.params;

    const listaDeseos = await ListaDeseos.findOne({ userId: req.userId });

    if (!listaDeseos) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lista de deseos no encontrada' 
      });
    }

    // Verificar si el juego existe en la lista
    const juegoExiste = listaDeseos.juegos.some(item => item.gameId === gameId);
    
    if (!juegoExiste) {
      return res.status(404).json({ 
        success: false, 
        message: 'El juego no está en tu lista de deseos' 
      });
    }

    // Filtrar para eliminar el juego
    listaDeseos.juegos = listaDeseos.juegos.filter(item => item.gameId !== gameId);

    await listaDeseos.save();

    res.json({
      success: true,
      message: 'Juego eliminado de la lista de deseos',
      wishlist: listaDeseos.juegos,
      count: listaDeseos.juegos.length
    });
  } catch (error) {
    console.error('Error en removeFromWishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar de wishlist', 
      error: error.message 
    });
  }
};

// Verificar si un juego está en wishlist
exports.checkInWishlist = async (req, res) => {
  try {
    const { gameId } = req.params;

    const listaDeseos = await ListaDeseos.findOne({ userId: req.userId });
    
    if (!listaDeseos) {
      return res.json({
        success: true,
        inWishlist: false
      });
    }

    const estaEnWishlist = listaDeseos.juegos.some(item => item.gameId === gameId);

    res.json({
      success: true,
      inWishlist: estaEnWishlist
    });
  } catch (error) {
    console.error('Error en checkInWishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al verificar wishlist' 
    });
  }
};

// Limpiar toda la wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const listaDeseos = await ListaDeseos.findOne({ userId: req.userId });

    if (!listaDeseos) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lista de deseos no encontrada' 
      });
    }

    listaDeseos.juegos = [];
    await listaDeseos.save();

    res.json({
      success: true,
      message: 'Lista de deseos limpiada',
      wishlist: [],
      count: 0
    });
  } catch (error) {
    console.error('Error en clearWishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al limpiar wishlist' 
    });
  }
};