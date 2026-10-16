const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let productos = [
  {
    id: 1,
    nombre: "Café",
    precio: 12000,
  },
  {
    id: 2,
    nombre: "Galletas",
    precio: 5000,
  },
  {
    id: 3,
    nombre: "Jugo",
    precio: 4500,
  },
];

// LISTAR PRODUCTOS
app.get("/api/productos", (req, res) => {
  res.json(productos);
});

// VER DETALLE
app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({
      mensaje: "Producto no encontrado",
    });
  }

  res.json(producto);
});

// CREAR PRODUCTO
app.post("/api/productos", (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined || Number(precio) <= 0) {
    return res.status(400).json({
      mensaje: "Debes ingresar un nombre y un precio válido",
    });
  }

  const nuevoProducto = {
    id:
      productos.length > 0
        ? Math.max(...productos.map((p) => p.id)) + 1
        : 1,
    nombre,
    precio: Number(precio),
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});