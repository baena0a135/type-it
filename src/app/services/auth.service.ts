import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase  from 'firebase/app';
import { Usuario } from '../usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  credenciales:any;

  constructor(public auth: AngularFireAuth, private router:Router, private db: AngularFirestore ) { }

  loginGoogle(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((credential => {
      this.credenciales = credential.user;
      this.updateUserData(this.credenciales),
      console.log(this.credenciales),
      this.router.navigate(['/tablones'])
      }));
  }

  loginFacebook(){
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((credential => {this.updateUserData(credential.user), this.router.navigate(['/tablones'])}))
    .catch(function (error) {console.log(error)} );
  }

  loginEmailAndPassword(email,password) {
    console.log("prueba de que entra");
    this.auth.signInWithEmailAndPassword(email, password).then((credential => {
      this.updateUserData(credential.user),
      console.log(credential.user),
      this.router.navigate(['/tablones'])
      }
      )
    )
    .catch(function (error){
      console.log(error);
    });
  }

  logOut(){
    this.auth.signOut();
  }

  private updateUserData(user: Usuario){
    const userRef:AngularFirestoreDocument<any> = this.db.doc(`usuarios/${user.uid}`);
    console.log('usuario/' + userRef);

    const data:Usuario = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }
  }
}
