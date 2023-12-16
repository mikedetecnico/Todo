import { FirebaseConnection } from "../Connections/FirebaseConnection";
import { IConnection } from "../Connections/IConnection";
import { Todo } from "../Models/Todo";
import { IRepository } from "./IRepository";

export class TodoRepository implements IRepository<Todo> {
    readonly connection: IConnection<Todo> = new FirebaseConnection<Todo>("Todos");;  

    constructor(connection: IConnection<Todo> | null = null) {
        if (connection !== null) {
            this.connection = connection;
        } 
    }

    add(item: Todo): Promise<Todo> {
        return this.connection.add(item);
    }
    delete(id: string): Promise<Todo> {
        return this.connection.delete(id);
    }
    getByUserId(userId: string): Promise<Todo[]> {
        return this.connection.getByUserId(userId);
    }
}