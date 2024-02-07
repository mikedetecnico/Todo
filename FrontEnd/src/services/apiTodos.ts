import axios from "axios";

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

    async getTodos(userId: string | undefined) : Promise<Todo[]> {
        if (userId === undefined) {
            throw new Error("User ID is undefined");
        }

        return (await axios.get(`${this.apiUrl}/todos/${userId}`)).data;
    }

    async addTodo(todo: Todo) : Promise<Todo> {
        return (await axios.post(`${this.apiUrl}/todos`, todo)).data;
    }

    async deleteTodoById(id: string) : Promise<Todo> {
        return (await axios.delete(`${this.apiUrl}/todos/${id}`)).data;
    }

    async updateTodoById(todo: Todo) : Promise<Todo> {
        return (await axios.put(`${this.apiUrl}/todos/${todo.id}`, todo)).data;
    }
}
