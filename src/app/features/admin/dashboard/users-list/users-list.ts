import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GetUsersResponse, User } from '../../../../shared/models/user.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../services/users-service';
import { switchMap, tap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  private userService = inject(UserService);

  protected readonly dataSource = new MatTableDataSource<User>([]);
  protected readonly meta = signal<GetUsersResponse['meta'] | null>(null);
  protected readonly page = signal(1);
  protected readonly limit = signal(10);

  private readonly params = computed(() => ({
    page: this.page(),
    limit: this.limit(),
  }));

  private readonly usersData = toSignal(
    toObservable(this.params).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap((params) => this.userService.getUsers(params)),
      tap(() => this.isLoading.set(false)),
    ),
  );

  protected readonly isLoading = signal(false);

  constructor() {
    effect(() => {
      const data = this.usersData();
      if (data) {
        this.dataSource.data = data.data;
        this.meta.set(data.meta);
      }
    });
  }

  protected onPageChange(event: any): void {
    this.page.set(event.pageIndex + 1);
    this.limit.set(event.pageSize);
  }

  protected readonly displayedColumns = [
    'first_name',
    'last_name',
    'email',
    'created_at',
    'updated_at',
    'actions',
  ];

  protected readonly formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
}
