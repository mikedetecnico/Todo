import axios from "axios";

export interface Todo {
    id: string;
    task: string;
    scheduledDate: string;
    completed: boolean;
    userId: string | undefined;
}

export default class Api {
    static async getTodos(userId: string | undefined) : Promise<Todo[]> {
        if (userId === undefined) {
            throw new Error("User ID is undefined");
        }

        const apiUrl : string = import.meta.env.VITE_API_URL;
        return (await axios.get(`${apiUrl}/todos/${userId}`)).data;
    }

    static async addTodo(todo: Todo) : Promise<Todo> {
        const apiUrl : string = import.meta.env.VITE_API_URL;
        return (await axios.post(`${apiUrl}/todos`, todo)).data;
    }

    static async deleteTodoById(id: string) : Promise<Todo> {
        const apiUrl : string = import.meta.env.VITE_API_URL;
        return (await axios.delete(`${apiUrl}/todos/${id}`)).data;
    }
}
