import { Component, computed, effect, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../shared/models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../../../services/users-service';
import { SnackbarService } from '../../../../../shared/utils/snackbar-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-user-form-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormField,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-form-dialog.html',
  styleUrl: './user-form-dialog.scss',
})
export class UserFormDialog {
  private readonly userService = inject(UserService);
  readonly dialogRef = inject(MatDialogRef<UserFormDialog>);
  readonly data = inject<User | null>(MAT_DIALOG_DATA);
  protected readonly initialModel = signal<UserFormData | null>(null);
  private snackbar = inject(SnackbarService);
  protected readonly isSubmitted = signal(false);

  protected readonly title = this.data?.id ? 'Editar usuário' : 'Cadastrar novo usuário';
  protected readonly buttonTitle = this.data?.id ? 'Salvar' : 'Criar';

  protected readonly userFormModel = signal<UserFormData>({
    first_name: '',
    last_name: '',
    email: '',
  });

  protected readonly userForm = form(this.userFormModel, (user) => {
    required(user.first_name, { message: 'Nome é obrigatório.' });
    required(user.email, { message: 'Email é obrigatório.' });
    email(user.email, { message: 'E-mail em formato inválido.' });
  });

  constructor() {
    effect(() => {
      const user = this.data;
      if (user) {
        const initial: UserFormData = {
          email: user.data.email,
          first_name: user.data.first_name,
          last_name: user.data.last_name,
        };
        this.initialModel.set(initial);
        this.userFormModel.set(initial);
      }
    });
  }

  protected readonly hasChanges = computed(() => {
    const current = this.userFormModel();
    const initial = this.initialModel();

    if (!initial) {
      return current.first_name !== '' || current.email !== '';
    }

    return (
      current.first_name !== initial.first_name ||
      current.last_name !== initial.last_name ||
      current.email !== initial.email
    );
  });

  protected readonly canSubmit = computed(() => {
    return !this.userForm().invalid() && this.hasChanges();
  });

  onCancel() {
    this.isSubmitted.set(false);
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.userForm().invalid()) return;
    const { first_name, last_name, email } = this.userFormModel();

    if (!this.data?.id) {
      this.userService
        .createUser({
          first_name,
          last_name,
          email,
        })
        .subscribe({
          next: () => {
            this.snackbar.success('Usuário criado com sucesso.');
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackbar.error('Erro ao criar novo usuário.');
          },
        });
    } else {
      this.userService
        .updateUser({
          id: this.data.id,
          first_name,
          last_name,
          email,
        })
        .subscribe({
          next: () => {
            this.snackbar.success('Usuário salvo com sucesso.');
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackbar.error('Erro ao salvar usuário.');
          },
        });
    }
  }
}
