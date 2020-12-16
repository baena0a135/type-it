
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../app/usuarios.service'
import { Tablones } from '../tablones.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  tablon:Tablones;
  credenciales:any;

  constructor(private router:Router,public usuario:UsuariosService, public authServices:AuthService) {
    this.loginForm = this.createFormGroup();

     }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required,Validators.minLength(5)]),
      password : new FormControl('',[Validators.required,Validators.minLength(5)])
    });
  }

  loginGoogle(){
      this.authServices.loginGoogle();

  }
  loginFacebook(){
    this.authServices.loginFacebook();
  }
  loginEmail(){
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.authServices.loginEmailAndPassword(email,password);
    this.formReset();
  }


  logOut(){
    this.authServices.logOut();
  }

  ngOnInit(): void {
  }
  formReset(){
    this.loginForm.reset();
  }

}
