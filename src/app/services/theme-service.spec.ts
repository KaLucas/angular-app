import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should start with light theme by default', () => {
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('Should toggle to dark mode', () => {
    service.toggle();
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('Should toggle back to light mode', () => {
    // Dark
    service.toggle();
    // Toggle back to light
    service.toggle();
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
