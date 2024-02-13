import { TodoService } from "../Services/TodoService";

export class TodoController {
    readonly service : TodoService;

    constructor (service: TodoService | null = null) {
        if (service !== null) {
            this.service = service;
        } else {
            this.service = new TodoService();
        }
    }

    async add(request: any, response: any) {
        try {
            const todo = await this.service.add(request.body);
            response.status(201).json(todo);
        } catch(error: any) {
            response.status(500).json(error.message);
        }
    }
    async delete(request: any, response: any) {
        try {
            const todo = await this.service.delete(request.params.id);
            response.status(200).json(todo);
        } catch (error: any) {
            response.status(404).json(error.message);
        }
    }
    async getByUserId(request: any, response: any) {
        try {
            const todos = await this.service.getByUserId(request.params.userId);
            response.status(200).json(todos);
        } catch (error: any) {
            response.status(500).json(error.message);
        }
    }

    async update(request: any, response: any) {
        try {
            const todo = await this.service.update(request.body, request.params.id);
            response.status(200).json(todo);
        } catch (error: any) {
            response.status(404).json(error.message);
        }
    }
}