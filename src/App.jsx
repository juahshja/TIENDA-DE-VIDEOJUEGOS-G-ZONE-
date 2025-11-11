import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './contexto/CarritoContext';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Carrito from './paginas/Carrito';
import DetalleProducto from './paginas/DetalleProducto'; 
import './App.css';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1 py-4">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/producto/:id" element={<DetalleProducto />} /> {}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CarritoProvider>
  );
}

export default App;