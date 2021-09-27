import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { default as firebase } from 'firebase/compat/app';

import { IUser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData?: firebase.User;
  user$ = new BehaviorSubject<IUser | null>(null);

  get isLoggedIn$() {
    return this.user$.pipe(map((user) => !!user));
  }

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.setCurrentUser(user);
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          this.setUserData(result.user);
          this.router.navigateByUrl('/');
        }
      })
      .catch((err) => console.error(err));
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          this.setUserData(result.user);
          this.router.navigateByUrl('/');
        }
      });
  }

  authLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          this.setUserData(result.user);
          this.router.navigateByUrl('/');
        }
      })
      .catch((error) => console.error(error));
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      // TODO put navigatioj here
      localStorage.removeItem('user');
    });
  }

  setUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    this.user$.next(userData);
    return userRef.set(userData, {
      merge: true,
    });
  }

  setCurrentUser(data: firebase.User | null) {
    if (data) {
      const user: IUser = {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
      };
      this.user$.next(user);
    } else {
      this.user$.next(null);
    }
  }
}
