import { TodoController } from './TodoController';
import { TodoRepository } from '../Repositories/TodoRepository';
import { FirebaseConnection } from '../Connections/FirebaseConnection';
import { Todo } from '../Models/Todo';
import * as admin from "firebase-admin";
import serviceAccount from '../../admin.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

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

  it('should update a todo', async () => {
    // add the todo to the database.
    const mockTodo = { task: 'Test Todo', scheduledDate: '', userId: 'test', completed: false };

    const mockAddResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.add({ body: mockTodo }, mockAddResponse);

    // get the first todo from the database so we have a id to update and update
    const toUpdate = mockAddResponse.json.mock.calls[0][0]; 

    const mockUpdateResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    toUpdate.task = 'Updated Task';

    await controller.update({ body: toUpdate, params: {id : toUpdate.id} }, mockUpdateResponse);

    // verify that the response was correct.
    expect(mockUpdateResponse.status).toHaveBeenCalledWith(200);
    expect(mockUpdateResponse.json).toHaveBeenCalledWith(toUpdate);
  });

  it('should return 404 when deleting a todo that does not exist', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.delete({ params: { id: 'test' } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('should return 404 when updating a todo that does not exist', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.update({ body: {}, params: { id: 'test' } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('should return 500 when adding a todo fails', async () => {
    // mocking the firebase connection to throw an error when adding a todo
    // since there will be no db connection.
    const testFirebaseConnection = new FirebaseConnection<Todo>('todos', {} as any);
    const testTodoRepository = new TodoRepository(testFirebaseConnection);
    const testController = new TodoController(testTodoRepository);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };  

    await testController.add({ body: {} }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  it('should return 500 when getting todos fails', async () => {
    // mocking the firebase connection to throw an error when getting todos
    // since there will be no db connection.
    const testFirebaseConnection = new FirebaseConnection<Todo>('todos', {} as any);
    const testTodoRepository = new TodoRepository(testFirebaseConnection);
    const testController = new TodoController(testTodoRepository);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await testController.getByUserId({ params: { userId: 'test' } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});