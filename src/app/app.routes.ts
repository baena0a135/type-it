import { Route } from '@angular/router';
import { MainComponent }  from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, canActivate  } from '@angular/fire/auth-guard';


export const APP_ROUTES:Route[] = [
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-in', component:SignInComponent},
  {path: "", redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/main', pathMatch: 'full'}

];
