import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Todo } from '../../data-access/todo.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'todo-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  fb = inject(FormBuilder);

  todoToEdit = input<Todo | null>(null);
  cancelEdit = output();
  addTodo = output<Partial<Todo>>();
  updateTodo = output<Todo>();
  formLoading = input<boolean>(false);

  formTitle = computed(() => (this.todoToEdit() ? 'Edit Todo' : 'Add Todo'));
  submitButtonText = computed(() => (this.todoToEdit() ? 'Update' : 'Add'));

  static dueDateInFutureValidator(
    control: import('@angular/forms').AbstractControl,
  ) {
    const value = control.value;
    if (!value) return null;
    const selectedDate = new Date(value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { dueDateInPast: true };
  }

  form = this.fb.group({
    title: [
      '',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
    description: [
      '',
      { nonNullable: false, validators: [Validators.maxLength(500)] },
    ],
    dueDate: [
      null as Date | null,
      {
        nonNullable: true,
        validators: [
          Validators.required,
          TodoFormComponent.dueDateInFutureValidator,
        ],
      },
    ],
  });

  constructor() {
    effect(() => {
      const todo = this.todoToEdit();
      if (todo) {
        this.form.patchValue({
          title: todo.title,
          description: todo.description,
          dueDate: new Date(todo.dueDate),
        });
      } else {
        this.form.reset();
      }
    });
  }

  oncancel() {
    if (this.todoToEdit()) {
      this.cancelEdit.emit();
    }
  }

  onsubmit() {
    if (this.form.valid) {
      const jsDate: Date = this.form.value.dueDate as Date;
      const year = jsDate.getFullYear();
      const month = String(jsDate.getMonth() + 1).padStart(2, '0');
      const day = String(jsDate.getDate()).padStart(2, '0');
      const isoDate = `${year}-${month}-${day}`;
      const todo: Partial<Todo> = {
        ...this.form.value,
        dueDate: isoDate,
      } as Partial<Todo>;
      if (this.todoToEdit()) {
        console.log('Updating todo:', todo);
        todo.id = this.todoToEdit()?.id;
        todo.createdDate = this.todoToEdit()?.createdDate;
        this.updateTodo.emit(todo as Todo);
      } else {
        this.addTodo.emit(todo);
      }
      this.form.reset();
    }
  }
}
