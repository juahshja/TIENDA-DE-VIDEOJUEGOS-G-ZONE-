import api from './api';  

export const ticketService = {
  // Crear nuevo ticket
  crearTicket: async (ticketData) => {
    try {
      const response = await api.post('/tickets/crear', ticketData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear ticket');
    }
  },

  // Obtener tickets del usuario
  obtenerMisTickets: async () => {
    try {
      const response = await api.get('/tickets/mis-tickets');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener tickets');
    }
  },

  // Obtener ticket por ID
  obtenerTicketPorId: async (id) => {
    try {
      const response = await api.get(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener ticket');
    }
  }
};