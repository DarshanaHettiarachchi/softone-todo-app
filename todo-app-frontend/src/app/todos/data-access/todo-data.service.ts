import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from './todo.model';
import { Result } from '../../utils/result.model';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorService } from '../../utils/http-error.service';
import { DEFAULT_TODO_FILTER, TodoFilter } from './filter.model';
import { ApiResponse } from './todo-api-response.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private todoUrl = 'api/todos';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  private todoToSave = signal<Todo | null>(null);
  private todoToSave$ = toObservable(this.todoToSave);

  selectedTodo = signal<Todo | null>(null);
  todosFilter = signal<TodoFilter>(DEFAULT_TODO_FILTER);

  private isFilterEqual(a: TodoFilter, b: TodoFilter): boolean {
    return (
      a.status === b.status &&
      a.sortBy === b.sortBy &&
      a.direction === b.direction
    );
  }

  private todosResponse$ = this.http
    .get<ApiResponse<Todo[]>>(this.todoUrl)
    .pipe(
      map((p) => ({ data: p.data } as Result<Todo[]>)),
      tap((p) => {
        this.selectedTodo.set(null); // Reset selected todo on new fetch
        console.log(JSON.stringify(p));
      }),
      catchError((err) =>
        of({
          data: [],
          error: this.errorService.formatError(err),
        } as Result<Todo[]>)
      )
    );

  private todoSavedResult$ = this.todoToSave$.pipe(
    filter(Boolean),
    switchMap((todo) => {
      return this.saveTodo(todo);
    })
  );

  private saveTodo(todo: Partial<Todo>): Observable<Result<Todo>> {
    return this.http.post<ApiResponse<Todo>>(this.todoUrl, todo).pipe(
      map((p) => ({ data: p.data } as Result<Todo>)),
      tap((p) => {
        this.selectedTodo.set(null); // Reset selected todo on new fetch
        console.log(JSON.stringify(p));
      }),
      catchError((err) =>
        of({
          data: {} as Todo,
          error: this.errorService.formatError(err),
        } as Result<Todo>)
      )
    );
  }

  private buildParams(filter: TodoFilter): HttpParams {
    return new HttpParams()
      .set('status', filter.status)
      .set('sortBy', filter.sortBy)
      .set('direction', filter.direction);
  }

  private todosResult = toSignal(this.todosResponse$, {
    initialValue: { data: [] } as Result<Todo[]>,
  });

  todos = computed(() => {
    const currentFilter = this.todosFilter();
    const todos = this.todosResult().data;

    const filteredTodos = todos?.filter((todo) => {
      if (currentFilter.status === 'all') {
        return true; // No filtering by status
      }
      return currentFilter.status === 'completed'
        ? todo.completed
        : !todo.completed;
    });

    return filteredTodos;
  });

  todosError = computed(() => this.todosResult().error);

  private todoSavedResult = toSignal(this.todoSavedResult$, {
    initialValue: { data: {} as Todo } as Result<Todo>,
  });

  todoSaved = computed(() => this.todoSavedResult().data);
  todoSavedError = computed(() => this.todoSavedResult().error);

  todoSelected(todo: Todo | null): void {
    this.selectedTodo.set(todo);
  }

  todoFilterChanged(filter: TodoFilter): void {
    if (this.isFilterEqual(this.todosFilter(), filter)) {
      return; // No change in filter, do nothing
    }
    this.todosFilter.set(filter);
  }

  addTodo(todo: Partial<Todo>): void {
    //this.saveTodo(todo);
    this.todoToSave.set(todo as Todo);
    // this.todosFilter.set(DEFAULT_TODO_FILTER);
    // this.reloadTrigger.update((x) => x + 1);
  }
}
