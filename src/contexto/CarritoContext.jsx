import React, { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { orderService } from '../servicios/orderService';

const CarritoContext = createContext();

const notificacionesReducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_NOTIFICACION':
      return [...state, action.payload];
    case 'ELIMINAR_NOTIFICACION':
      return state.filter(notif => notif.id !== action.payload);
    default:
      return state;
  }
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useLocalStorage('carrito-gzone', []);
  const [notificaciones, dispatchNotificaciones] = useReducer(notificacionesReducer, []);

  const agregarNotificacion = (mensaje, tipo = 'success') => {
    const id = Date.now();
    dispatchNotificaciones({
      type: 'AGREGAR_NOTIFICACION',
      payload: { id, mensaje, tipo }
    });
  };

  const eliminarNotificacion = (id) => {
    dispatchNotificaciones({
      type: 'ELIMINAR_NOTIFICACION',
      payload: id
    });
  };

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
      agregarNotificacion(`"${juego.nombre}" actualizado en el carrito`);
    } else {
      setCarrito([...carrito, { ...juego, cantidad: 1 }]);
      agregarNotificacion(`${juego.nombre} añadido al carrito`);
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
      agregarNotificacion(`Cantidad de "${existe.nombre}" disminuida`);
    }
  };

  const eliminarDelCarrito = (id) => {
    const juego = carrito.find(item => item.id === id);
    setCarrito(carrito.filter((item) => item.id !== id));
    agregarNotificacion(`${juego.nombre} eliminado del carrito`);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    agregarNotificacion('Carrito vaciado correctamente', 'danger');
  };

  // ✅ ESTO DEBE ESTAR AQUÍ, FUERA DE realizarCompra
  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const realizarCompra = async () => {
    try {
      const orderData = {
        juegos: carrito.map(juego => ({
          juegoId: juego.id || juego._id,
          nombre: juego.nombre,
          precio: juego.precio,
          cantidad: juego.cantidad || 1,
          imagen: juego.imagen || juego.imagenes?.[0] || ''
        })),
        total: totalCarrito
      };

      const response = await orderService.crearOrder(orderData);
      
      // Limpiar carrito después de compra exitosa
      setCarrito([]);
      
      // ✅ AGREGAR NOTIFICACIÓN DE ÉXITO
      agregarNotificacion('✅ Compra realizada exitosamente', 'success');
      
      return { 
        success: true, 
        message: '✅ Compra realizada exitosamente', 
        order: response.order 
      };
    } catch (error) {
      console.error('Error realizando compra:', error);
      
      // ✅ AGREGAR NOTIFICACIÓN DE ERROR
      agregarNotificacion('❌ Error al realizar la compra', 'danger');
      
      return { 
        success: false, 
        message: error.message || 'Error al realizar la compra' 
      };
    }
  };

  return (
    <CarritoContext.Provider
      value={{ 
        carrito, 
        agregarAlCarrito, 
        quitarDelCarrito,
        eliminarDelCarrito, 
        vaciarCarrito,
        realizarCompra,
        totalCarrito,
        cantidadTotal,
        notificaciones,
        eliminarNotificacion
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};