import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuariosService } from '../../app/usuarios.service'
import firebase  from 'firebase/app';
import { Usuario } from 'src/app/usuario.model';
import { Tablones } from '../tablones.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  tablon:Tablones;
  credenciales:any;

  constructor(public auth: AngularFireAuth, private titulo: Title, private router:Router,
     public usuario:UsuariosService, private db: AngularFirestore) {
    this.loginForm = this.createFormGroup();

     }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required,Validators.minLength(5)]),
      password : new FormControl('',[Validators.required,Validators.minLength(5)])
    });
  }

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
  loginEmail(){
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.loginEmailAndPassword({email,password});
  }

  loginEmailAndPassword({email,password}) {
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

  private updateUserData(user: Usuario){
    const userRef:AngularFirestoreDocument<any> = this.db.doc(`usuarios/${user.uid}`);
    console.log('usuario/' + userRef);

    const data:Usuario = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }

    console.log("he llegado aqui");
    return userRef.set(data,{merge:true});
  }


  logOut(){
    this.auth.signOut();
  }

  ngOnInit(): void {
  }
  formReset(){
    this.loginForm.reset();
  }

}
