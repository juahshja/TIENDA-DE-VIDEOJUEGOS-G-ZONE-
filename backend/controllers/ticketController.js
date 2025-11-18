const Ticket = require('../models/Ticket');
const User = require('../models/User'); // ← ✅ AGREGAR ESTA LÍNEA


exports.crearTicket = async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje, categoria } = req.body;
    
    // ✅ SOLUCIÓN: Obtener el userId del usuario logueado
    let userId = req.userId;
    
    // Si no hay userId, buscar el usuario por email
    if (!userId) {
      const User = require('../models/User'); // ← Agregar esto al inicio del archivo
      const usuario = await User.findOne({ email });
      if (usuario) {
        userId = usuario._id;
        console.log('🔍 Usuario encontrado por email:', userId);
      }
    }
    
    console.log('🎫 USER ID FINAL PARA TICKET:', userId);
    
    const nuevoTicket = new Ticket({
      nombre,
      email,
      asunto,
      mensaje,
      categoria: categoria || 'general',
      usuario: userId // ← Usar el userId encontrado
    });

    await nuevoTicket.save();
    
    console.log('💾 TICKET GUARDADO CON USER:', nuevoTicket.usuario);
    
    res.status(201).json({
      success: true,
      message: 'Ticket creado exitosamente',
      data: nuevoTicket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear ticket',
      error: error.message
    });
  }
};
exports.obtenerTicketsUsuario = async (req, res) => {
  try {
    console.log('🔍 User ID para buscar tickets:', req.userId);
    
    // Buscar SOLO por ID de usuario (sin email)
    const tickets = await Ticket.find({ 
      usuario: req.userId  // ← ✅ SOLO esto
    }).sort({ createdAt: -1 });

    console.log('🔍 Tickets encontrados:', tickets.length);
    
    res.status(200).json({
      success: true,
      data: tickets
    });
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener tickets',
      error: error.message
    });
  }
};

exports.obtenerTicketPorId = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener ticket',
      error: error.message
    });
  }
};