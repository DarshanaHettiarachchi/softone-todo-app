import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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

  form = this.fb.group({
    email: [''],
    password: [''],
  });

  authService = inject(AuthService);

  router = inject(Router);

  async onLogin() {
    try {
      const { email, password } = this.form.value;
      if (!email || !password) {
        console.error('Email and password are required');
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/todos']);
    } catch (err) {
      console.log('Login failed:', err);
      console.error(err);
    }
  }
}
