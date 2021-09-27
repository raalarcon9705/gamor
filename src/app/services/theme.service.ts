import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      this.doc.body.classList.remove('dark');
      this.doc.body.classList.add('light');
    } else {
      this.doc.body.classList.add('dark');
      this.doc.body.classList.remove('light');
    }
  }

  get theme() {
    return localStorage.getItem('theme');
  }
}
