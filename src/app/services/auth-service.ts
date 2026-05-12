import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

const USER = {
  email: 'admin@email.com',
  password: '123456',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isAuthenticated = signal(!!localStorage.getItem('token'));
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === USER.email && password === USER.password) {
      localStorage.setItem('token', 'fake-token');
      this._isAuthenticated.set(true);

      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
    this.router.navigate(['/admin']);
  }
}
