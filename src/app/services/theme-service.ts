import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly isDark = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    document.documentElement.classList.toggle('dark', this.isDark());
  }

  toggle() {
    this.isDark.update((theme) => !theme);
    document.documentElement.classList.toggle('dark', this.isDark());
  }
}
