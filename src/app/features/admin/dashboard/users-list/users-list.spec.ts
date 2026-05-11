import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersList } from './users-list';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';

const mockData = [
  {
    id: 'ec5dfe28-3da3-4f04-8bab-6e6fd42aeb72',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-05-11T19:29:33.993Z',
    updated_at: '2026-05-11T19:29:33.993Z',
    deleted_at: null,
    data: {
      email: 'ana@email.com',
      last_name: 'Marina',
      first_name: 'Ana',
    },
  },
  {
    id: 'da73f9be-7678-4495-810f-57a29dc622a8',
    collection_id: '89508090-51d1-4c5c-a8dd-d423d197ffb3',
    project_id: 7534,
    app_user_id: null,
    created_by: 101682,
    created_at: '2026-05-08T21:54:22.250Z',
    updated_at: '2026-05-11T19:22:04.907Z',
    deleted_at: null,
    data: {
      email: 'jose@email.com',
      last_name: 'Silveira',
      first_name: 'José',
    },
  },
];
registerLocaleData(localePtBr);

describe('UsersList', () => {
  let component: UsersList;
  let fixture: ComponentFixture<UsersList>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersList);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  function flushUsers() {
    const requests = httpMock.match((req) => req.url.includes('collections/users/records'));
    requests.forEach((req) =>
      req.flush({
        data: mockData,
        meta: { page: 1, limit: 10, total: 2, pages: 1 },
      }),
    );
  }

  it('should create', async () => {
    fixture.detectChanges();
    flushUsers();
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('should render users', async () => {
    fixture.detectChanges();
    flushUsers();
    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockData.length);
  });

  it('should render table', async () => {
    fixture.detectChanges();
    flushUsers();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const datePipe = new DatePipe('pt-BR');

    const rows = compiled.querySelectorAll('tbody tr');
    const cells = rows[0].querySelectorAll('td');

    expect(cells[0].textContent?.trim()).toBe(mockData[0].data.first_name);
    expect(cells[1].textContent?.trim()).toBe(mockData[0].data.last_name);
    expect(cells[2].textContent?.trim()).toBe(mockData[0].data.email);
    expect(cells[3].textContent?.trim()).toBe(
      datePipe.transform(mockData[0].created_at, 'dd/MM/yyyy'),
    );
    expect(cells[4].textContent?.trim()).toBe(
      datePipe.transform(mockData[0].updated_at, 'dd/MM/yyyy'),
    );
  });
});
