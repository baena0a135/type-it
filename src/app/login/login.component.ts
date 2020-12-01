import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, NgSelectOption } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(public auth: AngularFireAuth, private titulo: Title ) {   }

  loginGoogle(){
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginFacebook(){
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  loginEmail(){
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.auth.signInWithEmailAndPassword(email, password).then(function(user){
      console.log('Credenciales correctas, brother, bienvenido.')
    }).catch(function (error){
      console.log(error);
    });
  }
  logOut(){
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

}
