import api from './api';

export const obtenerWishlist = async () => {
  try {
    const response = await api.get('/wishlist');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al obtener wishlist';
  }
};

export const agregarAWishlist = async (juego) => {
  try {
    const response = await api.post('/wishlist', {
      gameId: juego.id.toString(),
      gameName: juego.nombre,
      gamePrice: Number(juego.precio),
      gameImage: juego.imagen
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al agregar a wishlist';
  }
};

export const eliminarDeWishlist = async (gameId) => {
  try {
    const response = await api.delete(`/wishlist/${gameId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al eliminar de wishlist';
  }
};

export const verificarEnWishlist = async (gameId) => {
  try {
    const response = await api.get(`/wishlist/check/${gameId}`);
    return response.data.inWishlist;
  } catch (error) {
    return false;
  }
};

export const limpiarWishlist = async () => {
  try {
    const response = await api.delete('/wishlist');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al limpiar wishlist';
  }
};  