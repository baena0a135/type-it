import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component'
import { APP_ROUTES } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpBackend, HttpClient } from '@angular/common/http';

import {SidebarModule} from 'ng-sidebar'

import {TranslateModule, TranslateLoader} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    RouterModule.forRoot(APP_ROUTES),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        deps: [HttpBackend],
        useFactory: translateHttpLoaderFactory
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader{
  return new TranslateHttpLoader(new HttpClient(httpBackend));
}
