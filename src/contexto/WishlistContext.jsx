import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerWishlist, agregarAWishlist, eliminarDeWishlist } from '../servicios/wishlistService';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist debe usarse dentro de WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Cargar wishlist cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      cargarWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated]);

  const cargarWishlist = async () => {
    try {
      setLoading(true);
      const data = await obtenerWishlist();
      setWishlist(data.wishlist || []);
    } catch (error) {
      console.error('Error al cargar wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const agregarJuegoWishlist = async (juego) => {
    try {
      const data = await agregarAWishlist(juego);
      setWishlist(data.wishlist);
      return { success: true, message: `${juego.nombre} agregado a tu lista de deseos` };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const eliminarJuegoWishlist = async (gameId) => {
    try {
      const data = await eliminarDeWishlist(gameId);
      setWishlist(data.wishlist);
      return { success: true, message: 'Juego eliminado de tu lista de deseos' };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const estaEnWishlist = (gameId) => {
    return wishlist.some(item => item.gameId === gameId.toString());
  };

  const cantidadWishlist = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        agregarJuegoWishlist,
        eliminarJuegoWishlist,
        estaEnWishlist,
        cantidadWishlist,
        cargarWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};