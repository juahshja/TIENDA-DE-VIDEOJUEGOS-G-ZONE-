import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"; // ← NUEVA LÍNEA

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useLocalStorage('carrito-gzone', []); // ← LÍNEA CAMBIADA

  // EL RESTO DEL CÓDIGO SE MANTIENE IGUAL
  const agregarAlCarrito = (juego) => {
    const existe = carrito.find((item) => item.id === juego.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === juego.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...juego, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (id) => {
    const existe = carrito.find((item) => item.id === id);
    if (existe.cantidad === 1) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      );
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ 
        carrito, 
        agregarAlCarrito, 
        quitarDelCarrito,
        eliminarDelCarrito, 
        vaciarCarrito,
        totalCarrito,
        cantidadTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};