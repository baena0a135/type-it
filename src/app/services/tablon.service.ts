import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tablones } from '../tablones.model';
import { Usuario } from '../usuario.model';
import firebase  from 'firebase/app';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class TablonService {


  private uid = firebase.auth().currentUser.uid;
  items: Observable<any>;

  constructor(private firestore: AngularFirestore, public auth: AngularFireAuth,private usuarioService:UsuariosService ) {
    this.items = this.firestore.collection("usuarios").doc(this.uid).collection("tablones").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tablones;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  userItem(){
     return this.items;
  }
  getTablones(){
    return this.firestore.collection('usuarios').doc().collection('tablones').snapshotChanges();
  }
  createTablon(tablon:Tablones){
    return  this.firestore.doc('usuarios/' + this.uid).collection('tablones').add(tablon);
  }
  updateTablon(tablon:any){
    this.firestore.collection('usuarios').doc( this.uid).collection('tablones').doc(`${tablon.id}`).update(tablon);
  }
  async deleteTablon(tablonUid:string){
    console.log("UID usuario: " + this.uid);
    console.log("UID tablon: " + tablonUid);
    const res= await this.firestore.collection('usuarios').doc(this.uid).collection('tablones').doc(tablonUid).delete();
    console.log(res);
  }
}
