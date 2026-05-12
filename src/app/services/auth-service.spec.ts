import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { provideRouter, Router } from '@angular/router';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    auth = TestBed.inject(AuthService);

    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('Should return false with invalid credentials', () => {
    expect(auth.login('wrong@email.com', '123456')).toBe(false);
  });

  it('Should return true with valid credentials', () => {
    expect(auth.login('admin@email.com', '123456')).toBe(true);
  });

  it('Should set token on valid login', () => {
    auth.login('admin@email.com', '123456');
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('Should remove token on logout', () => {
    auth.login('admin@email.com', '123456');
    auth.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
