import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tablones } from 'src/app/tablones.model';
import { TablonService } from 'src/app/services/tablon.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tablones',
  templateUrl: './tablones.component.html',
  styleUrls: ['./tablones.component.css']
})
export class TablonesComponent implements OnInit {
  fondos:any [] = ['default','fondo1', 'fondo2', 'fondo3', 'fondo4']
  tablonForm:FormGroup;
  newTablon:Tablones =  {
    titulo:'',
    descripcion:'',
    fondo:''
  };

  tablon:any = {
    name:''
  }

  editarTablon:any = {
    name:''
  }

  tablones:Observable<any> = this.tablonService.items

  constructor(private tablonService:TablonService) {
    this.tablonForm = this.createFormGroup();
   }

  createFormGroup() {
    return new FormGroup({
      titulo: new FormControl(''),
      descripcion : new FormControl(''),
      fondo: new FormControl('')
    });
  }
  formReset(){
    this.tablonForm.reset();
  }

  addTablon(){
    //this.updateTablonDataCreate(this.newTablon);
    this.tablonService.createTablon(this.newTablon);
    this.formReset();
  }
  deleteTablon(tablon){
    console.log(tablon);
    this.tablonService.deleteTablon(tablon);
  }
  updateTablon(tablon){
    this.editarTablon = tablon;
  }
  updateTablonEditado(){
    this.tablonService.updateTablon(this.editarTablon);
  }


  ngOnInit(): void {
  }

  get titulo (){
    return this.tablonForm.get('titulo');
  }
  get descripcion (){
    return this.tablonForm.get('descripcion');
  }
  get fondo(){
    return this.tablonForm.get('fondo');
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newTablon.fondo = reader.result.toString();
    });
  }


}
