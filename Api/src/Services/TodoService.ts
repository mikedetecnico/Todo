import { FirebaseRepository } from "../Repositories/FirebaseRepository";
import { IRepository } from "../Repositories/IRepository";
import { Todo } from "../Models/Todo";
import { IService } from "./IService";

export class TodoService implements IService<Todo> {
    readonly repository: IRepository<Todo>;

    constructor(connection: IRepository<Todo> | null = null) {
        if (connection !== null) {
            this.repository = connection;
        } else {
            this.repository = new FirebaseRepository<Todo>('todos');
        }
    }

    async add(item: Todo): Promise<Todo> {
        return await this.repository.add(item);
    }
    async delete(id: string): Promise<Todo | null> {
        return await this.repository.delete(id);
    }
    async getByUserId(userId: string): Promise<Todo[]> {
        return await this.repository.getByUserId(userId);
    }

    async update(item: Todo, id: string): Promise<Todo> {
        return await this.repository.update(item, id);
    }
}