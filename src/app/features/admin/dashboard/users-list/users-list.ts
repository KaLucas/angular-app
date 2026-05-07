import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../../shared/models/user.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersStore } from '../../../../store/services/users-store';
import { DatePipe } from '@angular/common';

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

  protected onPageChange(event: PageEvent): void {
    this.store.params.update((params) => ({
      ...params,
      page: event.pageIndex + 1,
      limit: event.pageSize,
    }));
  }

  protected readonly displayedColumns = [
    'first_name',
    'last_name',
    'email',
    'created_at',
    'updated_at',
    'actions',
  ];
}
