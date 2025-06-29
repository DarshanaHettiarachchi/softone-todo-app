import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { firstValueFrom } from 'rxjs';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSignal = signal<User | null>(null);

  user = this.userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  http = inject(HttpClient);

  router = inject(Router);

  constructor() {
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user();
      if (user) {
        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>('api/auth/login', {
      email,
      password,
    });
    const user = await firstValueFrom(login$);
    this.userSignal.set(user);
    ///This is only for the demo , It si very bad to store this anywhere
    const encoded = btoa(email + ':' + password);
    sessionStorage.setItem('authToken', 'Basic ' + encoded);
    return user;
  }

  loadUserFromStorage() {
    const json = sessionStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.userSignal.set(user);
    }
  }

  async logout() {
    sessionStorage.removeItem(USER_STORAGE_KEY);
    this.userSignal.set(null);
    await this.router.navigateByUrl('/login');
  }
}
