import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AfsService {
  constructor(private almacenArchivos: AngularFireStorage) { }

  porcentajeSubido: Observable<number> = new Observable<number>();
  downloadURL: Observable<string>;
  tarea;


  subirArchivo(archivo, rutaDestinoEnFirebase: string) {

    const referenciaArchivo = this.almacenArchivos.ref(rutaDestinoEnFirebase);

    // El método uplodad() recibe el patch destino incluyendo el nombre que va a tener el archivo subido y el archivo a subir
    // Nos devuvle un objeto tipo AngularFireUploadTask que nos va a permitir monitorear como suben los archivos
    this.tarea = this.almacenArchivos.upload(rutaDestinoEnFirebase, archivo);

    // Observamos el porcentaje de subido a traves de la propiedad percentageChanges()
    this.porcentajeSubido = this.tarea.percentageChanges();

    // Nos va a notificar cuando el archivo este listo el link para acceder al archivo
    this.tarea.snapshotChanges().pipe(
        finalize(() => this.downloadURL = referenciaArchivo.getDownloadURL() )
        // finalize(() => alert('termino') )
     )
    .subscribe();

    return this.downloadURL;
  }

  async subirFoto(rutaOrigenLocal: string, rutaDestinoEnFirebase: string) {
    // Para subir una foto a firebase primero la tenemos que converir en blob
    const archivoEnBlob = await fetch(rutaOrigenLocal).then(r => r.blob());
    // return this.subirArchivo(archivoEnBlob, rutaDestinoEnFirebase);
  }



  // async subirUnaFoto(rutaDestinoEnFirebase: string, rutaOrigenLocal: string) {
  //   // Para subir una foto a firebase primero la tenemos que converir en blob
  //   const archivoEnBlob = await fetch(rutaOrigenLocal).then(r => r.blob());
  //   const referenciaAlArchivo = this.almacenArchivos.ref(rutaDestinoEnFirebase);
  //   const tarea = this.almacenArchivos.upload(rutaDestinoEnFirebase, archivoEnBlob);

  //   // observe percentage changes
  //   this.uploadPercent = tarea.percentageChanges();
  //   tarea.percentageChanges().subscribe(
  //     x => console.log('Observer got a next value: ' + x),
  //   err => console.error('Observer got an error: ' + err),
  //   () => console.log('Observer got a complete notification'));


  //   // get notified when the download URL is available
  //   tarea.snapshotChanges().pipe(
  //     finalize(() => {
  //       this.downloadURL = referenciaAlArchivo.getDownloadURL();
  //       console.log('url', this.downloadURL);
  //     })
  //   )
  //     .subscribe();

  //   return this.downloadURL;
  // }





  // async subirUnaFoto2(event)
  // {
  //   const file = event.target.files[0];
  //   const filePath = 'nombreArchivo';
  //   const fileRef = this.almacenArchivos.ref(filePath);
  //   const task = this.almacenArchivos.upload(filePath, file);

  //   // observe percentage changes
  //   this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available
  //   task.snapshotChanges().pipe(
  //       finalize(() => this.downloadURL = fileRef.getDownloadURL() )
  //    )
  //   .subscribe();
  // }

  public obtenerReferenciaAUnArchivo(nombreArchivo: string) {
    return this.almacenArchivos.ref(nombreArchivo);
  }

  public obtenerReferenciaFotoPerfil(nombreUsuario: string) {
    return this.almacenArchivos.ref(`/fotosperfilusuarios/${nombreUsuario}.jpg`);
  }

  subirArchivo2(archivo, rutaDestinoEnFirebase: string, callback) {

    const referenciaArchivo = this.almacenArchivos.ref(rutaDestinoEnFirebase);

    // El método uplodad() recibe el patch destino incluyendo el nombre que va a tener el archivo subido y el archivo a subir
    // Nos devuvle un objeto tipo AngularFireUploadTask que nos va a permitir monitorear como suben los archivos
    const tarea = this.almacenArchivos.upload(rutaDestinoEnFirebase, archivo);

    // Observamos el porcentaje de subido a traves de la propiedad percentageChanges()
    this.porcentajeSubido = tarea.percentageChanges();

    // Nos va a notificar cuando el archivo este listo el link para acceder al archivo
    tarea.snapshotChanges().pipe(
        // finalize(() => this.downloadURL = referenciaArchivo.getDownloadURL() )
        finalize(() => {

          this.downloadURL = referenciaArchivo.getDownloadURL();
          callback() 
          
        })
     )
    .subscribe();

    return this.downloadURL;
  }


}
