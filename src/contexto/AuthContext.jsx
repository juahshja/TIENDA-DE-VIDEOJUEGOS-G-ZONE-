import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUsuario, registrarUsuario, cerrarSesion, obtenerUsuarioActual } from '../servicios/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar
    const usuarioActual = obtenerUsuarioActual();
    if (usuarioActual) {
      setUser(usuarioActual);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUsuario(email, password);
      setUser(data.user);
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const register = async (nombre, email, password) => {
    try {
      const data = await registrarUsuario(nombre, email, password);
      setUser(data.user);
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const logout = () => {
    cerrarSesion();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
