import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoItemComponent } from '../ui/todo-item/todo-item.component';
import { TodoFormComponent } from '../ui/todo-form/todo-form.component';
import { TodoDataService } from '../data-access/todo-data.service';
import { Todo } from '../data-access/todo.model';
import { MatCardModule } from '@angular/material/card';
import { TodoFilterFormComponent } from '../ui/todo-filter-form/todo-filter-form.component';
import { TodoFilter } from '../data-access/filter.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todos',
  imports: [
    TodoItemComponent,
    TodoFormComponent,
    TodoFilterFormComponent,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todoDataService = inject(TodoDataService);

  todosLoading = this.todoDataService.todosLoading;
  todosSaving = this.todoDataService.todoSaving;
  todos = this.todoDataService.todos;
  todosLoadingError = this.todoDataService.getTodosError;
  selectedTodo = this.todoDataService.selectedTodo;
  currentFilter = this.todoDataService.todosFilter;

  handleEditTodo(todo: Todo) {
    this.todoDataService.todoSelected(todo);
  }

  handleCancelEdit() {
    this.todoDataService.todoSelected(null);
  }

  handleAddTodo(todo: Partial<Todo>) {
    console.log('Adding todo:', todo);
    this.todoDataService.addTodo(todo);
  }

  handleUpdateTodo(todo: Todo) {
    this.todoDataService.setTodoToUpdate(todo);
  }

  handleFilterChange(filter: TodoFilter) {
    console.log('Filter changed:', filter);
    this.todoDataService.todoFilterChanged(filter);
  }
}
