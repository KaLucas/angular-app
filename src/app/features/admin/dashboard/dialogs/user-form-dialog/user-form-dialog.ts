import { Component, effect, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../shared/models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-user-form-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormField],
  templateUrl: './user-form-dialog.html',
  styleUrl: './user-form-dialog.scss',
})
export class UserFormDialog {
  readonly dialogRef = inject(MatDialogRef<UserFormDialog>);
  readonly data = inject<User | null>(MAT_DIALOG_DATA);

  protected readonly userFormModel = signal<UserFormData>({
    first_name: '',
    last_name: '',
    email: '',
  });

  protected readonly userForm = form(this.userFormModel, (user) => {
    required(user.first_name, { message: 'Nome é obrigatório.' });
    required(user.email, { message: 'Email é obrigatório.' });
    email(user.email, { message: 'O e-mail é inválido.' });
  });

  constructor() {
    effect(() => {
      const user = this.data;
      if (user) {
        this.userFormModel.set({
          email: user.data.email,
          first_name: user.data.first_name,
          last_name: user.data.last_name,
        });
      }
    });
  }
}
