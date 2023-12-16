import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRouter from './Controllers/TodoController';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));