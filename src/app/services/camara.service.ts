import { AngularFireStorage } from '@angular/fire/storage';
// Para sacar las fotos
import { Plugins, CameraResultType, CameraSource, CameraPhoto, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  fotoSanitizada: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,
    private storage: AngularFireStorage) { }


  private async obtenerUnaFoto(origen: CameraSource): Promise<string> {
    // Tanto para obtener una foto de la camara como de la galeria el procedimiento es el mismo
    // lo unico que cambia es el atributo source

    // Interface para definir las opciones de la camara
    const opcionesImagenes: CameraOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: origen // aca definimos el origen
    };

    // Este es el método en cuestión que obtiene la imagen
    const imagen: CameraPhoto = await Plugins.Camera.getPhoto(opcionesImagenes);
    
    // Este méotodo sanitiniza la imagén sacandole la metadata (CREO.. lo copipastie del ejemplo de Capacitor)
    this.fotoSanitizada = this.sanitizer.bypassSecurityTrustResourceUrl(imagen && (imagen.webPath));

    // "Webpath es un string que puede ser asignado al atributo src de una imagen y que se puede ser cargado y renderizado eficientemente
    //this.uploadAll(imagen.webPath);
    return imagen.webPath;
  }

  async tomarUnaFotoCamara(): Promise<string> {
    return await this.obtenerUnaFoto(CameraSource.Camera);
  }

  async abrirGaleriaFotos(): Promise<string> {
    return await this.obtenerUnaFoto(CameraSource.Photos);
  }

  private async uploadAll(webPath: string) {
    const ruta = "uploads/foto2.jpg";
    const blob = await fetch(webPath).then(r => r.blob());
    const referenciaAlArchivo = this.storage.ref(ruta);
    const tarea = this.storage.upload(ruta, blob);
  }

}
