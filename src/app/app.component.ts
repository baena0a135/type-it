import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title:string = "Type it";
  opened = false;


  /*constructor(private translate: TranslateService, private titleService: Title){
    var navigatorLanguaje = navigator.language.substr(0,2);
    console.log(navigator.language);
    translate.setDefaultLang(navigatorLanguaje);
    translate.use('es');
    this.changeTitle();
  }

  changeTitle() {
    this.translate.get('webTitle').subscribe((res:string) => {
      this.titleService.setTitle(res);
    });
  }

  changeLanguageToSpanish(){
    console.log("Idioma cambiado al español");
    this.translate.use('es');
    this.changeTitle();
  }
  changeLanguageToEnglish(){
    console.log("Idioma cambiado al ingles");
    this.translate.use('en');
    this.changeTitle();
  }*/

}

