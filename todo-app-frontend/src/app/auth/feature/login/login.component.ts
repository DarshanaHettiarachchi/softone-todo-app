import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fb = inject(FormBuilder);

  loginError = signal(false);

  form = this.fb.group({
    email: ['', { validators: Validators.required }],
    password: ['', { validators: Validators.required }],
  });

  authService = inject(AuthService);

  router = inject(Router);

  async onLogin() {
    this.form.markAllAsTouched();
    this.loginError.set(false);
    try {
      const { email, password } = this.form.value;
      if (!email || !password) {
        console.error('Email and password are required');
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/todos']);
    } catch (err) {
      console.error(err);
      this.loginError.set(true);
    }
  }
}
