import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from './todo.model';
import { Result } from '../../utils/result.model';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, Observable, of } from 'rxjs';
import { HttpErrorService } from '../../utils/http-error.service';
import { DEFAULT_TODO_FILTER, TodoFilter } from './filter.model';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private todoUrl = 'api/todos';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  selectedTodo = signal<Todo | null>(null);
  todosFilter = signal<TodoFilter>(DEFAULT_TODO_FILTER);

  private todosResult$ = this.http.get<Todo[]>(this.todoUrl).pipe(
    map((p) => ({ data: p } as Result<Todo[]>)),
    tap((p) => console.log(JSON.stringify(p))),
    catchError((err) =>
      of({
        data: [],
        error: this.errorService.formatError(err),
      } as Result<Todo[]>)
    )
  );

  private isFilterEqual(a: TodoFilter, b: TodoFilter): boolean {
    return (
      a.status === b.status &&
      a.sortBy === b.sortBy &&
      a.direction === b.direction
    );
  }

  private todosFilter$ = toObservable(this.todosFilter).pipe(
    distinctUntilChanged(this.isFilterEqual)
  );

  private reloadTrigger = signal(0);

  private combinedTrigger$ = combineLatest([
    this.todosFilter$,
    toObservable(this.reloadTrigger),
  ]);

  private todosResult2$ = this.combinedTrigger$.pipe(
    debounceTime(100),
    switchMap(() => this.getTodos())
  );

  private getTodos(): Observable<Result<Todo[]>> {
    const params = this.buildParams(this.todosFilter()).toString();
    console.log('Fetching todos with params:', params);
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      map((p) => ({ data: p } as Result<Todo[]>)),
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
  }

  private buildParams(filter: TodoFilter): HttpParams {
    return new HttpParams()
      .set('status', filter.status)
      .set('sortBy', filter.sortBy)
      .set('direction', filter.direction);
  }

  private todosResult = toSignal(this.todosResult2$, {
    initialValue: { data: [] } as Result<Todo[]>,
  });

  todos = computed(() => this.todosResult().data);
  todosError = computed(() => this.todosResult().error);

  todoSelected(todo: Todo | null): void {
    this.selectedTodo.set(todo);
  }

  todoFilterChanged(filter: TodoFilter): void {
    this.todosFilter.set(filter);
  }

  addTodo(todo: Partial<Todo>): void {
    this.todosFilter.set(DEFAULT_TODO_FILTER);
    this.reloadTrigger.update((x) => x + 1);
  }
}
