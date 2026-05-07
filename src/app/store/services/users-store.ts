import { Injectable, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/users-service';
import { User, GetUsersParams, GetUsersResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly userService = inject(UserService);

  readonly users = signal<User[]>([]);
  readonly meta = signal<GetUsersResponse['meta'] | null>(null);
  readonly isLoading = signal(false);

  readonly params = signal<GetUsersParams>({
    page: 1,
    limit: 10,
  });

  constructor() {
    effect(() => {
      const params = this.params();
      this.isLoading.set(true);

      this.userService.getUsers(params).subscribe({
        next: (response) => {
          this.users.set(response.data);
          this.meta.set(response.meta);
          this.isLoading.set(false);
        },

        error: () => {
          this.isLoading.set(false);
        },
      });
    });
  }
}
