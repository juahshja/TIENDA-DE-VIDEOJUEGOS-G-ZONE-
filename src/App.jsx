import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './contexto/CarritoContext'; // ← IMPORTA ESTO
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Carrito from './paginas/Carrito'; // ← Y ESTE TAMBIÉN
import './App.css';

function App() {
  return (
    <CarritoProvider> {/* ← ENVUELVE TODO CON ESTO */}
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1 py-4">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/carrito" element={<Carrito />} /> {/* ← ESTA RUTA */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CarritoProvider>
  );
}

export default App;