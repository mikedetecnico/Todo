import { FirebaseConnection } from "../Connections/FirebaseConnection";
import { IConnection } from "../Connections/IConnection";
import { Todo } from "../Models/Todo";
import { IRepository } from "./IRepository";

export class TodoRepository implements IRepository<Todo> {
    readonly connection: IConnection<Todo>;

    constructor(connection: IConnection<Todo> | null = null) {
        if (connection !== null) {
            this.connection = connection;
        } else {
            this.connection = new FirebaseConnection<Todo>('todos');
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