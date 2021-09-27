import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICharacter } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _charactersCollection: AngularFirestoreCollection<ICharacter>;
  characters$: Observable<ICharacter[]>;

  constructor(private afs: AngularFirestore) {
    this._charactersCollection = this.afs.collection('characters');
    this.characters$ = this._charactersCollection.valueChanges({
      idField: 'uid',
    });
  }
}
