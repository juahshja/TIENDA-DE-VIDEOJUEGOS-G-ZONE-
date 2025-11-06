function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-5">
      <div className="container">
        <p className="mb-2">
          © {new Date().getFullYear()} <strong>G-Zone</strong> 🎮 — Todos los derechos reservados.
        </p>
        <small className="text-muted">
          Desarrollado con React + Vite | Tu tienda de videojuegos de confianza
        </small>
      </div>
    </footer>
  );
}

export default Footer;