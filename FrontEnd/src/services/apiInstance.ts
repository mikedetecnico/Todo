import ApiTodos from "./apiTodos";

export default class ApiInstance {
    private static instance: ApiTodos;

    private constructor() {
        // Initialize the instance
    }

    static getInstance(apiUrl: string) {
        if (!ApiInstance.instance) {
            ApiInstance.instance = new ApiTodos(apiUrl);
        }
        return ApiInstance.instance;
    }
}