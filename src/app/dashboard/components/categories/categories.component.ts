import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  categories$ = this.categoriesService.categories$;

  constructor(private categoriesService: CategoriesService) {}
}
