import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../shared/models/register.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://portfolio-api-e8at.onrender.com';
  private readonly _isAuthenticated = signal(!!localStorage.getItem('token'));
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private router: Router) {}

  createRegister(data: Register) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/login`, data).pipe(
      tap((response) => {
        localStorage.setItem('token', response.accessToken);
        this._isAuthenticated.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
    this.router.navigate(['/admin']);
  }
}
