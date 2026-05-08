import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../../shared/models/user.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersStore } from '../../../../shared/store/services/users-store';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../dialogs/delete-dialog/delete-dialog';
import { UserFormDialog } from '../dialogs/user-form-dialog/user-form-dialog';

@Component({
  selector: 'app-users-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    DatePipe,
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  protected readonly store = inject(UsersStore);
  protected readonly dataSource = new MatTableDataSource<User>([]);
  readonly dialog = inject(MatDialog);

  protected onPageChange(event: PageEvent) {
    this.store.updateParams({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }

  protected readonly displayedColumns = [
    'first_name',
    'last_name',
    'email',
    'created_at',
    'updated_at',
    'actions',
  ];

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.store.reloadUsers();
      }
    });
  }

  openUserFormDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserFormDialog, {
      data: user ?? null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.store.reloadUsers();
        }, 500);
      }
    });
  }
}
