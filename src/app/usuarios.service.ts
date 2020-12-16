import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Usuario } from 'src/app/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) {

   }

  getUsuarios(){
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  createUsers(user:Usuario){
    return this.firestore.collection('usuarios').add(user);
  }
  updateUsers(user:Usuario){
    delete user.uid;
    this.firestore.doc('usuarios/' + user.uid).update(user);
  }
  deleteUsers(userId:string){
    this.firestore.doc('usuarios/' + userId).delete();
  }
}
