import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { setDoc, Firestore, doc, onSnapshot, Unsubscribe, collection, query, where, getDocs } from '@angular/fire/firestore';
import { map } from 'rxjs';

import { Usuario } from './../../models/usuario.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUnsubscribe!: Unsubscribe;

  constructor(private auth: Auth, private firestore: Firestore, private store: Store<AppState> ) { }

  initAuthListener() {
    authState(this.auth).subscribe( async fUser => {
      if (fUser) {
        const userRef = collection(this.firestore, 'user')
        const q = query(userRef, where("uid", "==", fUser.uid));
        const querySnapshot = (await getDocs(q))
        querySnapshot.forEach((doc: any) => {
          this.store.dispatch(authActions.setUser({user: doc.data()}))
        })
      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
      }
    })
  }

  createUser(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
            .then( ({ user }) => {
              const newUser = new Usuario(user.uid, name, email);
              return setDoc(doc(this.firestore, user.uid, 'user'), {...newUser});
            });
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword (this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(fUser => fUser !== null)
    )
  }

}
