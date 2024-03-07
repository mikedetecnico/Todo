import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { VerifyToken } from './Middleware/VerifyToken';
import todoRouter from './Router/TodoRouter';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(VerifyToken);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/todos", todoRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));