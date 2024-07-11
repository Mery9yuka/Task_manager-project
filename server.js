const express = require('express');
const bodyParser = require('body-parser'); // Importing body-parser
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// the middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON request body

let tasks = [];

// the routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = { id: tasks.length + 1, ...req.body };
  tasks.push(task);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
  res.json({ message: 'Task deleted' });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
