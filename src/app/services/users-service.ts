import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { environment } from '../environments/environment';
import {
  CreateUserData,
  GetUsersParams,
  GetUsersResponse,
  UpdateUserData,
} from '../shared/models/user.model';

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
        project_id: environment.projectId,
        page,
        limit,
      },
      headers: {
        'x-api-key': environment.apiKey,
        'X-Reqres-Env': environment.env,
      },
    });
  }

  createUser(data: CreateUserData) {
    return this.http.post(
      this.baseUrl,
      {
        data,
      },
      {
        params: { project_id: environment.projectId },
        headers: {
          'x-api-key': environment.apiKey,
          'X-Reqres-Env': environment.env,
        },
      },
    );
  }

  updateUser(data: UpdateUserData) {
    return this.http.put(
      `${this.baseUrl}/${data.id}`,
      {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        },
      },
      {
        params: { project_id: environment.projectId },
        headers: {
          'x-api-key': environment.apiKey,
          'X-Reqres-Env': environment.env,
        },
      },
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      params: { project_id: environment.projectId },
      headers: {
        'x-api-key': environment.apiKey,
        'X-Reqres-Env': environment.env,
      },
    });
  }
}
