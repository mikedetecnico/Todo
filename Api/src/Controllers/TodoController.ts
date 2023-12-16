import { Router } from "express";
import { TodoRepository } from "../Repositories/TodoRepository";

export class TodoController {
    readonly repository : TodoRepository = new TodoRepository();

    async add(request: any, response: any) {
        const todo = await this.repository.add(request.body);
        response.status(201).json(todo);
    }
    async delete(request: any, response: any) {
        const todo = await this.repository.delete(request.params.id);
        response.status(200).json(todo);
    }
    async getByUserId(request: any, response: any) {
        const todos = await this.repository.getByUserId(request.params.userId);
        response.status(200).json(todos);
    }
}

const controller = new TodoController();

const todoRouter = Router();
todoRouter.post('/', async (request, response) => await controller.add(request, response));
todoRouter.delete('/:id', async (request, response) => await controller.delete(request, response));
todoRouter.get('/:userId', async (request, response) => await controller.getByUserId(request, response));
export default todoRouter;