import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { VerifyToken } from './Middleware/VerifyToken';
import todoRouter from './Controllers/TodoController';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(VerifyToken);
app.use("/todos", todoRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));