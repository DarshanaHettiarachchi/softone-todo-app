import { Routes } from '@angular/router';
import { LoginComponent } from './auth/feature/login/login.component';
import { isUserAuthenticated } from './shared/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/feature/todos.component').then((m) => m.TodosComponent),
    canActivate: [isUserAuthenticated],
  },
];
