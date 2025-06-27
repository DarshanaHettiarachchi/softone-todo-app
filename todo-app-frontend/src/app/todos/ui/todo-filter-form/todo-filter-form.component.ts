import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-todo-filter-form',
  imports: [],
  templateUrl: './todo-filter-form.component.html',
  styleUrl: './todo-filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFilterFormComponent {}
