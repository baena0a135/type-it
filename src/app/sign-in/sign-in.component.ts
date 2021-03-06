import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app';
import { UsuariosService } from '../usuarios.service'
import { Usuario } from '../usuario.model'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signIn: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern : any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  constructor(private location:Location, public auth:AngularFireAuth, public users:UsuariosService, private afs: AngularFirestore) {
    this.signIn = this.createFormGroup();
   }

   ageValidator(control: FormControl): {[s:string]:boolean}{
    if (control.value) {
      if (new Date().getFullYear() - new Date(control.value).getFullYear() >= 17){
        return {required:false}
      } else {
        return{required:true}
      }
    }
  }

   createFormGroup() {
    return new FormGroup({
      email: new FormControl('', Validators.pattern(this.emailPattern)),
      displayName : new FormControl('', [Validators.required,Validators.minLength(5)]),
      password : new FormControl('',[Validators.required,Validators.minLength(5)]),
      nickname : new FormControl('')

    });
  }

  async sendForm(){
      const {email, password} = this.signIn.value;
      try{
        this.createUser(email,password);
        this.resetForm();
        console.log("usuario registrado con exito");
      } catch (error) {
        console.log(error);
      }


  }

  createUser(email, password) {
    console.log('Creating user ' + email);
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        console.log('¡Creamos el user, bro! Huepaje!');
      })
      .catch(function (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Ya existe el usuario');
          const soLogin = confirm(
            `Ya te habias registrado con este email, bro 😝.
            ¿Quieres iniciar sesión ✨?`
          );
        }
      });

  }


  resetForm(){
    this.signIn.reset();
  }

  ngOnInit(): void {
  }

  get displayName(){
    return this.signIn.get("name");
    }

  get email(){
    return this.signIn.get("email");
    }
   get message(){
      return this.signIn.get("message");
      }
   get nickname(){
     return this.signIn.get("nickname");
   }
   get password(){
    return this.signIn.get('password')
  }

}
