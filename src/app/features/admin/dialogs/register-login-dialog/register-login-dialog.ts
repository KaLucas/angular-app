import { Component, computed, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/utils/snackbar-service';
import { Register } from '../../../../shared/models/register.model';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { email, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth-service';

interface RegisterFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register-login-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormField,
    MatIcon,
  ],
  templateUrl: './register-login-dialog.html',
  styleUrl: './register-login-dialog.scss',
})
export class RegisterLoginDialog {
  private auth = inject(AuthService);
  readonly dialogRef = inject(MatDialogRef<RegisterLoginDialog>);
  readonly data = inject<Register>(MAT_DIALOG_DATA);
  private snackbar = inject(SnackbarService);
  protected readonly isSubmittedRegister = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly initialModel = signal<RegisterFormData | null>(null);

  protected readonly registerFormModel = signal<RegisterFormData>({
    email: '',
    password: '',
  });

  protected readonly registerForm = form(this.registerFormModel, (register) => {
    required(register.email, { message: 'Email é obrigatório.' });
    email(register.email, { message: 'E-mail em formato inválido.' });
    required(register.password, { message: 'Senha é obrigatória.' });
    minLength(register.password, 6, { message: 'A senha deve ter 6 caracteres.' });
    maxLength(register.password, 6, { message: 'A senha deve ter 6 caracteres.' });
  });

  protected readonly canSubmit = computed(() => {
    return !this.registerForm().invalid();
  });

  onSubmit() {
    if (this.registerForm().invalid()) return;

    const { email, password } = this.registerFormModel();

    this.auth.createRegister({ email, password }).subscribe({
      next: () => {
        this.dialogRef.close();
        this.snackbar.success('Usuário criado com sucesso.');
      },
      error: (error) => {
        const message = error.error?.message ?? 'Erro ao criar usuário.';
        this.snackbar.error(message);
      },
    });
  }
}
