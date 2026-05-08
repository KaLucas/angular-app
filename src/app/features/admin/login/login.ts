import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { email, form, required, FormField } from '@angular/forms/signals';
import { MatSnackBar } from '@angular/material/snack-bar';

interface LoginData {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected readonly loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  protected readonly loginForm = form(this.loginModel, (login) => {
    required(login.email, { message: 'E-mail é obrigatório.' });
    email(login.email, { message: 'E-mail em formato inválido.' });
    required(login.password, { message: 'A senha é obrigatória.' });
  });

  protected readonly invalidCredentials = signal(false);

  openSnackbar() {
    this.snackBar.open('E-mail ou senha inválidos.', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }

  onSubmit() {
    if (this.loginForm().invalid()) return;

    const { email, password } = this.loginModel();
    const success = this.auth.login(email, password);

    if (success) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.openSnackbar();
    }
  }
}
