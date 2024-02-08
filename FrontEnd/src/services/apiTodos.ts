import axios from "axios";
import { User } from "firebase/auth";

export interface Todo {
    id: string;
    task: string;
    scheduledDate: string;
    completed: boolean;
    userId: string | undefined;
}

export default class ApiTodos {
    readonly apiUrl : string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getTodos(userId: string | undefined, user: User | null | undefined) : Promise<Todo[]> {
        if (userId === undefined) {
            throw new Error("User ID is undefined");
        }

        const token = user && (await user.getIdToken());

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return (await axios.get(`${this.apiUrl}/todos/${userId}`, config)).data;
    }

    async addTodo(todo: Todo, user: User | null | undefined) : Promise<Todo> {
        const token = user && (await user.getIdToken());
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return (await axios.post(`${this.apiUrl}/todos`, todo, config)).data;
    }

    async deleteTodoById(id: string, user: User | null | undefined) : Promise<Todo> {
        const token = user && (await user.getIdToken());

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return (await axios.delete(`${this.apiUrl}/todos/${id}`, config)).data;
    }

    async updateTodoById(todo: Todo, user: User | null | undefined) : Promise<Todo> {
        const token = user && (await user.getIdToken());

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return (await axios.put(`${this.apiUrl}/todos/${todo.id}`, todo, config)).data;
    }
}
