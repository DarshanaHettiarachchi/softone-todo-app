import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  DEFAULT_TODO_FILTER,
  TodoFilter,
} from '../../data-access/filter.model';

@Component({
  selector: 'todo-filter-form',
  imports: [MatCardModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './todo-filter-form.component.html',
  styleUrl: './todo-filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFilterFormComponent {
  currentFilter = input<TodoFilter>();
  filterChanged = output<TodoFilter>();

  from = new FormGroup({
    status: new FormControl<string>(
      this.currentFilter()?.status || DEFAULT_TODO_FILTER.status
    ),
    sortBy: new FormControl<string>(
      this.currentFilter()?.sortBy || DEFAULT_TODO_FILTER.sortBy
    ),
    direction: new FormControl<string>(
      this.currentFilter()?.direction || DEFAULT_TODO_FILTER.direction
    ),
  });

  filterValues = toSignal(this.from.valueChanges);

  constructor() {
    effect(() => {
      const values = this.filterValues();
      if (values) {
        this.filterChanged.emit({
          status: values.status as string,
          sortBy: values.sortBy as string,
          direction: values.direction as string,
        } as TodoFilter);
      }
    });

    effect(() => {
      const current = this.currentFilter();
      if (current) {
        this.from.patchValue(
          {
            status: current.status,
            sortBy: current.sortBy,
            direction: current.direction,
          },
          { emitEvent: false }
        );
      }
    });
  }
}
