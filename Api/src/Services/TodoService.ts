import { FirebaseRepository } from "../Repositories/FirebaseRepository";
import { IRepository } from "../Repositories/IRepository";
import { Todo } from "../Models/Todo";
import { IService } from "./IService";

export class TodoService implements IService<Todo> {
    readonly connection: IRepository<Todo>;

    constructor(connection: IRepository<Todo> | null = null) {
        if (connection !== null) {
            this.connection = connection;
        } else {
            this.connection = new FirebaseRepository<Todo>('todos');
        }
    }

    async add(item: Todo): Promise<Todo> {
        return await this.connection.add(item);
    }
    async delete(id: string): Promise<Todo | null> {
        return await this.connection.delete(id);
    }
    async getByUserId(userId: string): Promise<Todo[]> {
        return await this.connection.getByUserId(userId);
    }

    async update(item: Todo, id: string): Promise<Todo> {
        return await this.connection.update(item, id);
    }
}