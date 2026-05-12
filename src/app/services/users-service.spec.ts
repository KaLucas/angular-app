import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './users-service';
import { environment } from '../environments/environment';

const mockUser = {
  id: '1',
  data: {
    first_name: 'Karina',
    last_name: 'Lucas',
    email: 'email@email.com',
  },
};

const mockResponse = {
  data: [mockUser],
  meta: { page: 1, limit: 10, total: 1, pages: 1 },
};

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  describe('Get Users', () => {
    it('Should get users without params', () => {
      service.getUsers().subscribe((res) => {
        expect(res.data.length).toBe(1);
        expect(res.meta.total).toBe(1);
      });

      const req = httpMock.expectOne(
        (req) => req.url.includes('collections/users/records') && req.method === 'GET',
      );
      expect(req.request.params.get('project_id')).toBe(String(environment.projectId));
      req.flush(mockResponse);
    });

    it('Should get users with pagination params', () => {
      service.getUsers({ page: 2, limit: 5 }).subscribe();

      const req = httpMock.expectOne(
        (req) => req.url.includes('collections/users/records') && req.method === 'GET',
      );
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('limit')).toBe('5');
      req.flush(mockResponse);
    });
  });

  describe('Create User', () => {
    it('Should create a new user', () => {
      const newUser = { first_name: 'Ana', last_name: 'Marina', email: 'ana@email.com' };

      service.createUser(newUser).subscribe();

      const req = httpMock.expectOne(
        (req) => req.url.includes('collections/users/records') && req.method === 'POST',
      );
      expect(req.request.body.data).toEqual(newUser);
      req.flush(mockUser);
    });
  });

  describe('Update User', () => {
    it('Should edit an existing user', () => {
      const updatedUser = {
        id: mockUser.id,
        first_name: 'Ana',
        last_name: 'Silva',
        email: 'ana@email.com',
      };

      service.updateUser(updatedUser).subscribe();

      const req = httpMock.expectOne(
        (req) => req.url.includes(mockUser.id) && req.method === 'PUT',
      );
      expect(req.request.body.data.last_name).toBe('Silva');
      req.flush(mockUser);
    });
  });

  describe('Delete User', () => {
    it('Should deklete a user', () => {
      service.deleteUser(mockUser.id).subscribe();

      const req = httpMock.expectOne(
        (req) => req.url.includes(mockUser.id) && req.method === 'DELETE',
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
