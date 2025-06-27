import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../todos/data-access/todo.model';
import { TodoData } from './todos';

export class TodoDataServer implements InMemoryDbService {
  createDb(): { todos: Todo[] } {
    const todos: Todo[] = TodoData.todos;
    return { todos };
  }
}
