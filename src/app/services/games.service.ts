import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IGame } from '../interfaces/game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private _gamesCollection: AngularFirestoreCollection<IGame>;
  games: Observable<IGame[]>;

  constructor(private afs: AngularFirestore) {
    this._gamesCollection = this.afs.collection('games');
    this.games = this._gamesCollection.valueChanges();
  }

  search(platform: string) {
    return this.afs
      .collection<IGame>('games', (ref) =>
        ref.where('platform', '==', platform)
      )
      .valueChanges({ idField: 'uid' });
  }
}
