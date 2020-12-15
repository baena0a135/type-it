import { Route } from '@angular/router';
import { MainComponent }  from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TablonesComponent } from './logueado/tablones/tablones.component'
import { UsuarioListComponent } from './usuario-list/usuario-list.component'
import { AngularFireAuthGuard, AngularFireAuthGuardModule, canActivate  } from '@angular/fire/auth-guard';


export const APP_ROUTES:Route[] = [
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-in', component:SignInComponent},
  {path: 'tablones', component:TablonesComponent},
  {path: 'usuario-list', component:UsuarioListComponent},
  {path: "", redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/main', pathMatch: 'full'}

];
