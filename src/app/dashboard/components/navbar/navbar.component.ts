import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  user$ = this.authService.user$;
  isDarkTheme = this.themeService.theme === 'dark';
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  toggleTheme() {
    if (this.isDarkTheme) {
      this.themeService.setTheme('light');
    } else {
      this.themeService.setTheme('dark');
    }

    this.isDarkTheme = this.themeService.theme === 'dark';
  }

  signOut() {
    this.authService.signOut();
  }
}
