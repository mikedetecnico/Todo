// Api/src/Controllers/TodoController.test.ts
import { TodoController } from './TodoController';
import { TodoRepository } from '../Repositories/TodoRepository';
import { FirebaseConnection } from '../Connections/FirebaseConnection';
import { Todo } from '../Models/Todo';

jest.mock('../Repositories/TodoRepository');

describe('TodoController', () => {
  let controller: TodoController;
  let repository: TodoRepository;
  let connection: jest.Mocked<FirebaseConnection<Todo>>;

  beforeEach(() => {
    connection = new FirebaseConnection<Todo>('todos') as jest.Mocked<FirebaseConnection<Todo>>;
    connection.add = jest.fn(async (todo: Todo) => {return todo});
    repository = new TodoRepository(connection);
    controller = new TodoController(repository);
  });

  it('should add a todo', async () => {
    const mockTodo = { id: '1', task: 'Test Todo', scheduledDate: '', userId: '', completed: false };
  
    // Mock the response object and its methods
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await controller.add({ body: mockTodo }, mockResponse);
  
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});