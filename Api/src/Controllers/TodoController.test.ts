import { TodoController } from './TodoController';
import { TodoRepository } from '../Repositories/TodoRepository';
import { FirebaseConnection } from '../Connections/FirebaseConnection';
import { Todo } from '../Models/Todo';
import * as admin from "firebase-admin";

describe('TodoController', () => {
  let controller: TodoController;
  let firebaseConnection: FirebaseConnection<Todo>;
  let todoRepository: TodoRepository;

  beforeEach(() => {
    firebaseConnection = new FirebaseConnection<Todo>('todos', admin.firestore());
    todoRepository = new TodoRepository(firebaseConnection);
    controller = new TodoController(todoRepository);
  });

  afterEach(async () => {
    await firebaseConnection.deleteAll();
  });

  it('should add a todo', async () => {
    // create the mock todo and add it to the db.
    const mockTodo = { task: 'Test Todo', scheduledDate: '', userId: '', completed: false };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await controller.add({ body: mockTodo }, mockResponse);
  
    // verify that the response was correct.
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTodo);
  });

  it('should get by user id', async () => {
    // create the mock todo and add it to the db.
    const mockTodo = { task: 'Test Todo', scheduledDate: '', userId: 'test', completed: false };

    const mockAddResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await controller.add({ body: mockTodo }, mockAddResponse);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // verify that the response was correct.
    await controller.getByUserId({ params: { userId: 'test' } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockTodo]);
  });

  it('should delete a todo' , async () => {
    // create the mock todo and add it to the db.
    const mockTodo = { task: 'Test Todo', scheduledDate: '', userId: 'test', completed: false };

    const mockAddResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.add({ body: mockTodo }, mockAddResponse);

    const mockGetResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // get the first todo from the database so we have a id to delete.
    await controller.getByUserId({ params: { userId: 'test' } }, mockGetResponse);

    const toDelete = mockGetResponse.json.mock.calls[0][0][0];
    
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    await controller.delete({ params: { id: toDelete.id} }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(toDelete);
  });
});