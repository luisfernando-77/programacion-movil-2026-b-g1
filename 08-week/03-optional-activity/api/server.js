const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let tareas = [
  { id: 1, titulo: 'Estudiar Programación Móvil' },
  { id: 2, titulo: 'Terminar actividad Semana 8' }
];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo
  };

  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});