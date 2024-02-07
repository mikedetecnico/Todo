import axios from 'axios';
import ApiInstance from './apiInstance';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('todo api tests', () => {
    const api = ApiInstance.getInstance("http://localhost:3000");

    it('should fetch todos', () => {
        const todos = [{ task: 'Test Todo', scheduledDate: '', userId: 'test'}];
    
        const resp = { data: todos };
        mockedAxios.get.mockResolvedValue(resp);
    
        return api.getTodos('test').then((data) => expect(data).toEqual(todos));
    });

    it('should add a todo', () => {
        const todo = { id: '1', task: 'Test Todo', scheduledDate: '', userId: 'test', completed: false};
    
        const resp = { data: todo };
        mockedAxios.post.mockResolvedValue(resp);
    
        return api.addTodo(todo).then((data) => expect(data).toEqual(todo));
    });

    it('should delete a todo', () => {
        const todo = { id: '1', task: 'Test Todo', scheduledDate: '', userId: 'test', completed: false};
    
        const resp = { data: todo };
        mockedAxios.delete.mockResolvedValue(resp);
    
        return api.deleteTodoById('1').then((data) => expect(data).toEqual(todo));
    });

    it('should update a todo', () => {
        const todo = { id: '1', task: 'Test Todo', scheduledDate: '', userId: 'test', completed: false};
    
        const resp = { data: todo };
        mockedAxios.put.mockResolvedValue(resp);
    
        return api.updateTodoById(todo).then((data) => expect(data).toEqual(todo));
    });
});