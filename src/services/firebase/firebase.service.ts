import { Injectable } from '@angular/core';

// libraries
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

// shared
import { CONSTANTS } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore
  ) { }

  addTodo(payload){
    return this.angularFireStore.collection(CONSTANTS.DATABASE.COLLECTIONS.TODOLIST)
      .add(payload)
  }

  getCurrentUser(){
    return this.angularFireAuth.authState;
  }

  getTodo(){
    const accountId = this.isAuthenticated().uid;
    
    return this.angularFireStore.collection(CONSTANTS.DATABASE.COLLECTIONS.TODOLIST, ref => ref.where('created_by', '==', accountId))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(item => Object.assign({}, { id: item.payload.doc.id }, item.payload.doc.data() )))
      );
  }

  isAuthenticated(){
    return this.angularFireAuth.auth.currentUser;
  }

  removeTodo(id){
    return this.angularFireStore.collection(CONSTANTS.DATABASE.COLLECTIONS.TODOLIST)
      .doc(id)
      .delete()
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

  updateTodo(id, params){
    return this.angularFireStore.collection(CONSTANTS.DATABASE.COLLECTIONS.TODOLIST)
      .doc(id)
      .update(params)
  }
  
}
