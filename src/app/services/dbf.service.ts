import { Injectable } from '@angular/core';


// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVoto } from '../model/ivoto';
import { IPublicacion } from '../model/ipublicacion';


@Injectable({
  providedIn: 'root'
})
export class DbfService {

  coleccionPublicaciones: AngularFirestoreCollection<IPublicacion>;
  coleccionVotos: AngularFirestoreCollection<IVoto>;
  referenciaColeccionPublicaciones;
  tipoPublicacion: string;

  constructor(private db: AngularFirestore) {
    // this.coleccionPublicaciones = this.db.collection<IPublicacion>('publicaciones');
    this.coleccionVotos = this.db.collection<IVoto>('votos');
  }



  public agregarPublicacion(nuevaPublicacion: IPublicacion) {
    this.coleccionPublicaciones.add(nuevaPublicacion);
  }


  public traerTodosLasPublicaciones(nombreColeccion: string): Observable<IPublicacion[]> {

    this.coleccionPublicaciones = this.db.collection<IPublicacion>(nombreColeccion);

    this.coleccionVotos = this.db.collection<IVoto>('votos');

    return this.db.collection(nombreColeccion, ref =>
      ref.orderBy('timeStamp', 'desc')).snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const datos = a.payload.doc.data() as IPublicacion;
            const id = a.payload.doc.id;
            return { id, ...datos };
          }))
      )

  }

  public votarUnaFoto(nuevoVoto: IVoto) {
    this.coleccionVotos.add(nuevoVoto);
  }

  public traerVotosDeUnUsuario(usuario: firebase.User, idPublicacion: string) {
    this.coleccionVotos.ref.where("usuario", "==", usuario.email).get();
    return this.coleccionVotos.ref.where("idPublicacion", "==", idPublicacion).get();
  }

}
