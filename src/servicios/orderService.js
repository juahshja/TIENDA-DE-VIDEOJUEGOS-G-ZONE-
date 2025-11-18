import api from './api';

export const orderService = {
  crearOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creando orden' };
    }
  },

  obtenerOrdersUsuario: async () => {
    try {
      const response = await api.get('/orders/usuario');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error obteniendo órdenes' };
    }
  }
};