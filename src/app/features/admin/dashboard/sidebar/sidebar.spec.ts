import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Sidebar } from './sidebar';
import { LOCALE_ID } from '@angular/core';

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

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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

  it('should render card', async () => {
    fixture.detectChanges();
    flushUsers();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const summaryCard = compiled.querySelector('[data-testid="users-summary-card"]');
    const totalUsers = compiled.querySelector('[data-testid="total-users"]');

    expect(summaryCard).toBeTruthy();
    expect(totalUsers?.textContent?.trim()).toBe('2');
  });
});
