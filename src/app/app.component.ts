import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gamor';

  constructor(themeService: ThemeService) {
    if (themeService.theme === 'dark') {
      themeService.setTheme('dark');
    }
  }
}
