import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { TodoItemComponent } from '../ui/todo-item/todo-item.component';
import { TodoFormComponent } from '../ui/todo-form/todo-form.component';
import { TodoDataService } from '../data-access/todo-data.service';
import { Todo } from '../data-access/todo.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, TodoFormComponent, MatCardModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todoDataService = inject(TodoDataService);

  todos = this.todoDataService.todos;
  todosError = this.todoDataService.todosError;
  selectedTodo = this.todoDataService.selectedTodo;

  formTitle = computed(() => (this.selectedTodo() ? 'Edit Todo' : 'Add Todo'));

  handleEditTodo(todo: Todo) {
    this.todoDataService.todoSelected(todo);
  }

  handleCancelEdit() {
    this.todoDataService.todoSelected(null);
  }

  handleAddTodo(todo: Partial<Todo>) {}

  handleUpdateTodo(todo: Todo) {}
}
