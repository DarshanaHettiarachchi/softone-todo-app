import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../data-access/todo.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  editItem = output<Todo>();
  deleteItem = output<Todo>();
  toggleComplete = output<Todo>();

  get isOverdue(): boolean {
    const today = new Date();
    const dueDate = new Date(this.todo().dueDate);
    return dueDate < today && !this.todo().completed;
  }

  onEdit(): void {
    this.editItem.emit(this.todo());
  }

  onDelete() {
    this.deleteItem.emit(this.todo());
  }

  toggleCompleteStatus() {
    this.toggleComplete.emit(this.todo());
  }
}
