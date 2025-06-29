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
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private readonly TODO_URL = 'api/todos';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private router = inject(Router);
  private currentRoute = inject(ActivatedRoute);
  private confirmDialog = inject(ConfirmationDialogService);

  private todoToSave = signal<Todo | null>(null);
  private todoToSave$ = toObservable(this.todoToSave);
  private currentTodos = signal<Todo[]>([]);
  private todoToUpdate = signal<Todo | null>(null);
  private todoToDelete = signal<Todo | null>(null);

  private todoToUpdate$ = toObservable(this.todoToUpdate);
  private todoToDelete$ = toObservable(this.todoToDelete);

  private todoUpdateResult$ = this.todoToUpdate$.pipe(
    filter(Boolean),
    switchMap((todo) => {
      return this.updateTodo(todo);
    })
  );

  private todoUpdateResult = toSignal(this.todoUpdateResult$, {
    initialValue: null,
  });

  private todoDeleteResult$ = this.todoToDelete$.pipe(
    filter(Boolean),
    switchMap((todo) => {
      return this.deleteTodo(todo);
    })
  );

  private todoDeleteResult = toSignal(this.todoDeleteResult$, {
    initialValue: null,
  });

  private todosResponse$ = this.http
    .get<ApiResponse<Todo[]>>(this.TODO_URL)
    .pipe(
      map((t) => ({ data: t.data } as Result<Todo[]>)),
      tap((t) => {
        this.todosLoading.set(false);
        this.selectedTodo.set(null); // Reset selected todo on new fetch
        this.currentTodos.set(t.data || []);
        console.log(t.data);
      }),
      catchError((err) => {
        this.todosLoading.set(false);
        return of({
          data: [],
          error: this.errorService.formatError(err),
        } as Result<Todo[]>);
      })
    );

  private todosResult = toSignal(this.todosResponse$, {
    initialValue: { data: [] } as Result<Todo[]>,
  });

  private todoSavedResult$ = this.todoToSave$.pipe(
    filter(Boolean),
    switchMap((todo) => {
      return this.addTodo(todo);
    })
  );

  selectedTodo = signal<Todo | null>(null);
  todosFilter = signal<TodoFilter>(DEFAULT_TODO_FILTER);
  getTodosError = computed(() => this.todosResult().error);
  todosLoading = signal(true);
  todoSaving = signal(false);

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

  //receivedTodos = computed(() => this.todosResult().data);

  filteredTodos = computed(() => {
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
          ? new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          : new Date(a.createdDate).getTime() -
              new Date(b.createdDate).getTime();
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

  setTodoFilter(filter: TodoFilter): void {
    if (this.isFilterEqual(this.todosFilter(), filter)) {
      return; // No change in filter, do nothing
    }
    this.todosFilter.set(filter);
  }

  setTodoToSave(todo: Partial<Todo>): void {
    this.todoToSave.set(todo as Todo);
  }

  setTodoToUpdate(todo: Todo): void {
    this.todoToUpdate.set(todo);
  }

  async setTodoToDelete(todo: Todo): Promise<void> {
    const confirmed = await this.confirmDialog.confirm(
      `Are you sure you want to delete "${todo.title}"?`
    );
    if (!confirmed) {
      return;
    }
    this.todoToDelete.set(todo);
  }

  private addTodo(todo: Partial<Todo>): Observable<Result<Todo>> {
    this.todoSaving.set(true);
    return this.http.post<ApiResponse<Todo>>(this.TODO_URL, todo).pipe(
      map((t) => ({ data: t.data } as Result<Todo>)),
      tap((t) => {
        this.todoSaving.set(false);
        console.log(t);
        this.currentTodos.update((todos) => [...todos, t.data] as Todo[]);
        this.todoToSave.set(null);
      }),
      catchError((err) => {
        this.todoSaving.set(false);
        return of({
          data: {} as Todo,
          error: this.errorService.formatError(err),
        } as Result<Todo>);
      })
    );
  }

  private updateTodo(todo: Partial<Todo>): Observable<Result<void>> {
    return this.http
      .put<ApiResponse<void>>(this.TODO_URL + '/' + todo.id, todo)
      .pipe(
        map(() => ({ data: undefined } as Result<void>)),
        tap((t) => {
          console.log(t);
          this.currentTodos.update((todos) => {
            todos = todos.filter((t) => t.id !== todo.id);
            return [...todos, todo] as Todo[];
          });
        }),
        catchError((err) =>
          of({
            error: this.errorService.formatError(err),
          } as Result<void>)
        )
      );
  }

  private deleteTodo(todo: Partial<Todo>): Observable<Result<void>> {
    return this.http
      .delete<ApiResponse<void>>(this.TODO_URL + '/' + todo.id)
      .pipe(
        map(() => ({ data: undefined } as Result<void>)),
        tap((t) => {
          console.log(t);
          this.currentTodos.update((todos) => {
            return (todos = todos.filter((t) => t.id !== todo.id) as Todo[]);
          });
        }),
        catchError((err) =>
          of({
            error: this.errorService.formatError(err),
          } as Result<void>)
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
