import { Todo } from '../todos/data-access/todo.model';

export class TodoData {
  static todos: Todo[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
      completed: false,
      dueDate: new Date('2025-10-01'),
    },
    {
      id: 2,
      title: 'Task 2',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      completed: false,
      dueDate: new Date('2025-10-01'),
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'lorem10 ipsum dolor sit amet, consectetur adipiscing elit',
      completed: true,
      dueDate: new Date('2025-10-01'),
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
      completed: false,
      dueDate: new Date('2025-10-01'),
    },
  ];
}
