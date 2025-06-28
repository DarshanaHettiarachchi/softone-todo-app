import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { Todo } from './todo.model';
import { Result } from '../../utils/result.model';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorService } from '../../utils/http-error.service';
import { DEFAULT_TODO_FILTER, TodoFilter } from './filter.model';
import { ApiResponse } from './todo-api-response.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private readonly TODO_URL = 'api/todos';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private router = inject(Router);
  private currentRoute = inject(ActivatedRoute);

  private todoToSave = signal<Todo | null>(null);
  private todoToSave$ = toObservable(this.todoToSave);
  private currentTodos = signal<Todo[]>([]);

  selectedTodo = signal<Todo | null>(null);
  todosFilter = signal<TodoFilter>(DEFAULT_TODO_FILTER);

  constructor() {
    effect(() => {
      const currentFilter = this.todosFilter();
      this.router.navigate([], {
        relativeTo: this.currentRoute,
        queryParams: currentFilter,
        queryParamsHandling: 'merge',
      });
    });
  }

  private todosResponse$ = this.http
    .get<ApiResponse<Todo[]>>(this.TODO_URL)
    .pipe(
      map((t) => ({ data: t.data } as Result<Todo[]>)),
      tap((t) => {
        this.selectedTodo.set(null); // Reset selected todo on new fetch
        this.currentTodos.set(t.data || []);
        console.log(t.data);
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

  private todosResult = toSignal(this.todosResponse$, {
    initialValue: { data: [] } as Result<Todo[]>,
  });

  //receivedTodos = computed(() => this.todosResult().data);
  todosError = computed(() => this.todosResult().error);

  todos = computed(() => {
    const currentFilter = this.todosFilter();
    const todos = this.currentTodos();

    let filteredTodos = todos?.filter((todo) => {
      if (currentFilter.status === 'all') {
        return true; // No filtering by status
      }
      return currentFilter.status === 'completed'
        ? todo.completed
        : !todo.completed;
    });

    filteredTodos = filteredTodos?.sort((a, b) => {
      console.log('sorting');
      if (currentFilter.sortBy === 'created') {
        return currentFilter.direction === 'asc'
          ? new Date(a.createdDate).getTime() -
              new Date(b.createdDate).getTime()
          : new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime();
      }
      return currentFilter.direction === 'asc'
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });

    return filteredTodos;
  });

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
    this.todoToSave.set(todo as Todo);
  }

  private saveTodo(todo: Partial<Todo>): Observable<Result<Todo>> {
    return this.http.post<ApiResponse<Todo>>(this.TODO_URL, todo).pipe(
      map((t) => ({ data: t.data } as Result<Todo>)),
      tap((t) => {
        console.log(t);
        this.currentTodos.update((todos) => [...todos, t.data] as Todo[]);
        this.todoToSave.set(null);
      }),
      catchError((err) =>
        of({
          data: {} as Todo,
          error: this.errorService.formatError(err),
        } as Result<Todo>)
      )
    );
  }

  private isFilterEqual(a: TodoFilter, b: TodoFilter): boolean {
    return (
      a.status === b.status &&
      a.sortBy === b.sortBy &&
      a.direction === b.direction
    );
  }
}
