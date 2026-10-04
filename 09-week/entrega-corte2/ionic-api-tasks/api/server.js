const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: 'Study Ionic',
    description: 'Review Ionic React components'
  }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required'
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json(task);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});