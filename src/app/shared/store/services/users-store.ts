import { Injectable, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '../../../services/users-service';
import { GetUsersParams } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly userService = inject(UserService);

  readonly params = linkedSignal<GetUsersParams>(() => ({
    page: 1,
    limit: 10,
  }));

  readonly usersResource = rxResource({
    params: () => this.params(),

    stream: ({ params }) => this.userService.getUsers(params),
  });

  readonly users = () => {
    try {
      return this.usersResource.value()?.data ?? [];
    } catch {
      return [];
    }
  };

  readonly meta = () => {
    try {
      return this.usersResource.value()?.meta ?? null;
    } catch {
      return null;
    }
  };
  readonly isLoading = () => this.usersResource.isLoading();
  readonly error = () => this.usersResource.error();

  updateParams(params: Partial<GetUsersParams>) {
    this.params.update((current) => ({
      ...current,
      ...params,
    }));
  }

  reloadUsers() {
    this.params.update((current) => ({ ...current }));
  }
}
