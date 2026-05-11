import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="button"]');
    expect(button?.textContent?.trim()).toContain('Login');
  });

  it('should disable button when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="button"]') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
