import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Todo } from '../../data-access/todo.model';

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

  formTitle = computed(() => (this.todoToEdit() ? 'Edit Todo' : 'Add Todo'));
  submitButtonText = computed(() => (this.todoToEdit() ? 'Update' : 'Add'));

  form = this.fb.group({
    title: [''],
    description: [''],
    dueDate: [null as unknown as Date],
  });

  constructor() {
    effect(() => {
      const todo = this.todoToEdit();
      if (todo) {
        this.form.patchValue({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
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
      const todo: Partial<Todo> = {
        ...this.form.value,
      } as Partial<Todo>;
      if (this.todoToEdit()) {
        this.updateTodo.emit(todo as Todo);
      } else {
        this.addTodo.emit(todo);
      }
      this.form.reset();
    }
  }
}
