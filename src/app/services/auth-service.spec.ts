import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    auth = TestBed.inject(AuthService);
  });

  it('should return false with invalid credentials', () => {
    expect(auth.login('wrong@email.com', '123456')).toBe(false);
  });

  it('should return true with valid credentials', () => {
    expect(auth.login('admin@email.com', '123456')).toBe(true);
  });

  it('should set token on valid login', () => {
    auth.login('admin@email.com', '123456');
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('should remove token on logout', () => {
    auth.login('admin@email.com', '123456');
    auth.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
