// Lista de juegos de ejemplo
const juegos = [
  {
    id: 1,
    nombre: "God of War Ragnarök",
    precio: 59.99,
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
    categoria: "Acción",
    plataforma: "PS5",
    descripcion: "Una épica aventura nórdica con Kratos y Atreus"
  },
  {
    id: 2,
    nombre: "The Legend of Zelda: TOTK",
    precio: 69.99,
    imagen: "https://i.redd.it/4rkflsjclf0b1.png",
    categoria: "Aventura",
    plataforma: "Nintendo Switch",
    descripcion: "Explora los cielos y las profundidades de Hyrule"
  },
  {
    id: 3,
    nombre: "Cyberpunk 2077",
    precio: 49.99,
    imagen: "https://press.cdprojektred.com/_next/image?url=https%3A%2F%2Fpress.cdn.cdpr.app%2Fnews%2F6fdf182c4be4a018da07e1703f3a21aefb6d5833525d8ec1.png&w=1920&q=75",
    categoria: "RPG",
    plataforma: "PC",
    descripcion: "Un RPG de mundo abierto en Night City"
  },
  {
    id: 4,
    nombre: "FIFA 24",
    precio: 69.99,
    imagen: "https://cdn2.unrealengine.com/hero-image-1920x1086-7c2bd7ea7c42.jpg",
    categoria: "Deportes",
    plataforma: "PS5",
    descripcion: "El mejor juego de fútbol del mundo"
  },
  {
    id: 5,
    nombre: "Halo Infinite",
    precio: 54.99,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2KPhjfZ9PQRWN8YyBRRb6x6BK5FisSwDrA&s",
    categoria: "Shooter",
    plataforma: "Xbox Series X",
    descripcion: "La legendaria franquicia de shooter regresa"
  },
  {
    id: 6,
    nombre: "Super Mario Odyssey",
    precio: 49.99,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-9bFb82p4QTFbgB22CXva8GCFDhZR4QZWg&s",
    categoria: "Aventura",
    plataforma: "Nintendo Switch",
    descripcion: "Únete a Mario en una aventura alrededor del mundo"
  }
];

// Función para obtener todos los juegos
export const obtenerJuegos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(juegos);
    }, 1000);
  });
};

// Función para obtener un juego por ID
export const obtenerJuegoPorId = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const juego = juegos.find(j => j.id === parseInt(id));
      if (juego) {
        resolve(juego);
      } else {
        reject(new Error('Juego no encontrado'));
      }
    }, 500);
  });
};

// Función para obtener juegos por categoría
export const obtenerJuegosPorCategoria = (categoria) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const juegosFiltrados = juegos.filter(j => j.categoria === categoria);
      resolve(juegosFiltrados);
    }, 500);
  });
};

// Función para obtener juegos por plataforma
export const obtenerJuegosPorPlataforma = (plataforma) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const juegosFiltrados = juegos.filter(j => j.plataforma === plataforma);
      resolve(juegosFiltrados);
    }, 500);
  });
};
