import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { environment } from '../environments/environment';
import { CreateUserData, GetUsersParams, GetUsersResponse } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}collections/users/records`;

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  getUsers(params: GetUsersParams) {
    const { page, limit } = params;

    return this.http.get<GetUsersResponse>(this.baseUrl, {
      params: {
        page,
        limit,
      },
      headers: {
        'x-api-key': environment.apiKey,
        'X-Reqres-Env': environment.env,
      },
    });
  }

  // createUser(data: CreateUserData) {
  //   const { firstName, lastName, email } = data;

  //   this.isLoading.set(true);
  //   this.error.set(null);

  //   return this.http.post(
  //     this.baseUrl,
  //     {
  //       data: {
  //         first_name: firstName,
  //         last_name: lastName,
  //         email,
  //       },
  //     },
  //     {
  //       params: { project_id: `${environment.projectId}` },
  //     },
  //   );
  // }
}
