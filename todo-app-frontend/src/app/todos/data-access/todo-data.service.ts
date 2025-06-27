import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from './todo.model';
import { Result } from '../../utils/result.model';
import { catchError, map, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { HttpErrorService } from '../../utils/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private todoUrl = 'api/todos';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  selectedTodo = signal<Todo | null>(null);

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

  private todosResult = toSignal(this.todosResult$, {
    initialValue: { data: [] } as Result<Todo[]>,
  });

  todos = computed(() => this.todosResult().data);
  todosError = computed(() => this.todosResult().error);

  todoSelected(todo: Todo | null): void {
    this.selectedTodo.set(todo);
  }

  addTodo(todo: Partial<Todo>): void {}
}
