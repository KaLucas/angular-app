import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/users-service';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  private readonly userService = inject(UserService);
  readonly dialogRef = inject(MatDialogRef<DeleteDialog>);
  readonly data = inject<User>(MAT_DIALOG_DATA);

  delete() {
    this.userService.deleteUser(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: () => {
        console.log('erro');
      },
    });
  }
}
