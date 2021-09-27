import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _categoriesCollection: AngularFirestoreCollection<ICategory>;
  categories$: Observable<ICategory[]>;

  constructor(private afs: AngularFirestore) {
    this._categoriesCollection = this.afs.collection('categories');
    this.categories$ = this._categoriesCollection.valueChanges();
  }
}
