import api from './api';

export const registrarUsuario = async (nombre, email, password) => {
  try {
    const response = await api.post('/auth/register', { nombre, email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    throw new Error(response.data.message || 'Error al registrar usuario');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al registrar usuario';
  }
};

export const loginUsuario = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    throw new Error(response.data.message || 'Error al iniciar sesión');
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al iniciar sesión';
  }
};

export const obtenerPerfil = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Error al obtener perfil';
  }
};

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const obtenerUsuarioActual = () => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

export const estaAutenticado = () => {
  return !!localStorage.getItem('token');
};