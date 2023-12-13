import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

let todos: Todo[] = [];

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo: Todo = {
    id: new Date().toISOString(),
    task: req.body.task,
    completed: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id === req.params.id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).send();
  }
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex((todo) => todo.id === req.params.id);
  if (index !== -1) {
    const [deletedTodo] = todos.splice(index, 1);
    res.json(deletedTodo);
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));