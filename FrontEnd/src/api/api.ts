import axios from "axios";

export interface Todo {
    id: string;
    task: string;
    scheduledDate: string;
    completed: boolean;
    userId: string;
}

export default class Api {
    static async getTodos(userId: string) : Promise<Todo[]> {
        const apiUrl : string = import.meta.env.VITE_API_URL;
        return (await axios.get(`${apiUrl}/todos?userId=${userId}`)).data;
    }

    static async addTodo(todo: Todo) : Promise<Todo> {
        const apiUrl : string = import.meta.env.VITE_API_URL;
        return (await axios.post(`${apiUrl}/todos`, todo)).data;
    }
}
