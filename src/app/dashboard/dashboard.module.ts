import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MainBoardComponent } from './components/main-board/main-board.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainSectionComponent } from './components/main-board/components/main-section/main-section.component';
import { SearchSectionComponent } from './components/main-board/components/search-section/search-section.component';
import { AdSectionComponent } from './components/main-board/components/ad-section/ad-section.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    MainBoardComponent,
    CategoriesComponent,
    MainSectionComponent,
    SearchSectionComponent,
    AdSectionComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, OverlayModule],
})
export class DashboardModule {}
