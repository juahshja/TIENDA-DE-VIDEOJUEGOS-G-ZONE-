const Order = require('../models/Order');

const crearOrder = async (req, res) => {
  try {
    const { juegos, total } = req.body;
    const usuario = req.userId;

    const nuevaOrder = new Order({
      usuario,
      juegos,
      total
    });

    await nuevaOrder.save();

    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      order: nuevaOrder
    });
  } catch (error) {
    console.error('Error creando orden:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error del servidor' 
    });
  }
};

const obtenerOrdersUsuario = async (req, res) => {
  try {
    const usuario = req.userId;

    const orders = await Order.find({ usuario })
      .sort({ createdAt: -1 });

    const totalJuegosComprados = orders.reduce((total, order) => {
      return total + order.juegos.reduce((sum, juego) => sum + juego.cantidad, 0);
    }, 0);

    res.json({
      success: true,
      orders,
      totalJuegosComprados,
      totalOrders: orders.length
    });
  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error del servidor' 
    });
  }
};

module.exports = {
  crearOrder,
  obtenerOrdersUsuario
};