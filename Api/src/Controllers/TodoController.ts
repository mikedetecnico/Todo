import { TodoRepository } from "../Repositories/TodoRepository";

export class TodoController {
    readonly repository : TodoRepository;

    constructor (repository: TodoRepository | null = null) {
        if (repository !== null) {
            this.repository = repository;
        } else {
            this.repository = new TodoRepository();
        }
    }

    async add(request: any, response: any) {
        try {
            const todo = await this.repository.add(request.body);
            response.status(201).json(todo);
        } catch(error: any) {
            response.status(500).json(error.message);
        }
    }
    async delete(request: any, response: any) {
        try {
            const todo = await this.repository.delete(request.params.id);
            response.status(200).json(todo);
        } catch (error: any) {
            response.status(404).json(error.message);
        }
    }
    async getByUserId(request: any, response: any) {
        try {
            const todos = await this.repository.getByUserId(request.params.userId);
            response.status(200).json(todos);
        } catch (error: any) {
            response.status(500).json(error.message);
        }
    }

    async update(request: any, response: any) {
        try {
            const todo = await this.repository.update(request.body, request.params.id);
            response.status(200).json(todo);
        } catch (error: any) {
            response.status(404).json(error.message);
        }
    }
}