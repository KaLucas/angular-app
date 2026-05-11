import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/users-service';
import { User } from '../../../../../shared/models/user.model';
import { SnackbarService } from '../../../../../shared/utils/snackbar-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  private readonly userService = inject(UserService);
  readonly dialogRef = inject(MatDialogRef<DeleteDialog>);
  readonly data = inject<User>(MAT_DIALOG_DATA);
  private snackbar = inject(SnackbarService);
  protected readonly isSubmitted = signal(false);

  onDelete() {
    this.isSubmitted.set(true);
    this.userService.deleteUser(this.data.id).subscribe({
      next: () => {
        this.snackbar.success('Usuário deletado com sucesso.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbar.error('Erro ao deletar usuário.');
      },
    });
  }
}
