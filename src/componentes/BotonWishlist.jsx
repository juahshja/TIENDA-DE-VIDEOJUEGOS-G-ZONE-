import { useState } from 'react';
import { useAuth } from '../contexto/AuthContext';
import { useWishlist } from '../contexto/WishlistContext';
import { useNavigate } from 'react-router-dom';

function BotonWishlist({ juego }) {
  const { isAuthenticated } = useAuth();
  const { estaEnWishlist, agregarJuegoWishlist, eliminarJuegoWishlist } = useWishlist();
  const [procesando, setProcesando] = useState(false);
  const navigate = useNavigate();

  const enWishlist = estaEnWishlist(juego.id);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar juegos a tu lista de deseos');
      navigate('/login');
      return;
    }

    setProcesando(true);
    try {
      if (enWishlist) {
        const result = await eliminarJuegoWishlist(juego.id.toString());
        if (result.success) {
          console.log(result.message);
        }
      } else {
        const result = await agregarJuegoWishlist(juego);
        if (result.success) {
          console.log(result.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={procesando}
      className={`btn btn-sm ${enWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
      title={enWishlist ? 'Eliminar de lista de deseos' : 'Agregar a lista de deseos'}
    >
      <i className={`${enWishlist ? 'fas' : 'far'} fa-heart`}></i>
    </button>
  );
}

export default BotonWishlist;