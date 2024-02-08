import { Router } from "express";
import { TodoController } from "../Controllers/TodoController";

const controller = new TodoController();

const todoRouter = Router();
todoRouter.post('/', async (request, response) => await controller.add(request, response));
todoRouter.delete('/:id', async (request, response) => await controller.delete(request, response));
todoRouter.get('/:userId', async (request, response) => await controller.getByUserId(request, response));
todoRouter.put('/:id', async (request, response) => await controller.update(request, response));
export default todoRouter;