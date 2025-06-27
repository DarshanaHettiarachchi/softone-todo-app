import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/feature/todos.component').then((m) => m.TodosComponent),
  },
];
