import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/usuarios.service';
import { Usuario } from 'src/app/usuario.model';
import { nextTick } from 'process';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  users:Observable<any[]>;

  constructor(private usuarioService:UsuariosService, private firestore: AngularFirestore) {
    this.users = this.firestore.collection("usuarios").valueChanges();
   }

  ngOnInit(): void {

  }
  create (users:Usuario){
    this.usuarioService.createUsers(users);
  }
  update(user:Usuario) {
    this.usuarioService.updateUsers(user);
  }

  delete(id: string) {
    this.usuarioService.deleteUsers(id);
  }
}
