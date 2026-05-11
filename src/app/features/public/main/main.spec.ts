import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Main } from './main';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('Main', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Main],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    const requests = httpMock.match((req) => req.url.includes('collections/users/records'));
    requests.forEach((req) =>
      req.flush({
        data: [],
        meta: { page: 1, limit: 10, total: 0, pages: 1 },
      }),
    );

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Usuários cadastrados');
  });
});
