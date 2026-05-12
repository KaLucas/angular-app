import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
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

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render sidebar and users list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sidebar = compiled.querySelector('[data-testid="sidebar-component"]');
    const usersList = compiled.querySelector('[data-testid="users-list-component"]');

    expect(sidebar).toBeTruthy();
    expect(usersList).toBeTruthy();
  });
});
