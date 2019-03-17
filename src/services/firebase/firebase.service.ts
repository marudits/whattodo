import { Injectable } from '@angular/core';

// libraries
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  getCurrentUser(){
    return this.angularFireAuth.authState;
  }

  isAuthenticated(){
    return this.angularFireAuth.auth.currentUser;
  }

  signIn(email, password){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.angularFireAuth.auth.signOut();
  }

  signUp(email, password){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
