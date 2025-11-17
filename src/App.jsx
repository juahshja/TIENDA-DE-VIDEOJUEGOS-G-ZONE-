import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './contexto/CarritoContext';
import { AuthProvider } from './contexto/AuthContext';
import { WishlistProvider } from './contexto/WishlistContext';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Carrito from './paginas/Carrito';
import DetalleProducto from './paginas/DetalleProducto';
import CentroAyuda from './paginas/CentroAyuda';
import Login from './paginas/Login';
import Registro from './paginas/Registro';
import Wishlist from './paginas/Wishlist';
import Perfil from './paginas/Perfil';
import ContenedorNotificaciones from './componentes/ContenedorNotificaciones';
import { useCarrito } from './contexto/CarritoContext';
import './App.css';
import './estilos/global.css';

function ContenidoConNotificaciones() {
  const { notificaciones, eliminarNotificacion } = useCarrito();

  return (
    <>
      <ContenedorNotificaciones 
        notificaciones={notificaciones} 
        eliminarNotificacion={eliminarNotificacion} 
      />
      <Navbar />
      <main className="flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/centro-ayuda" element={<CentroAyuda />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CarritoProvider>
          <Router>
            <div className="d-flex flex-column min-vh-100">
              <ContenidoConNotificaciones />
            </div>
          </Router>
        </CarritoProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;