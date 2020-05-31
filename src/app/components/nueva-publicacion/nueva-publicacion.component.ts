import { IPublicacion } from 'src/app/model/ipublicacion';
import { DbfService } from './../../services/dbf.service';
import { AuthService } from './../../services/auth.service';
import { AfsService } from './../../services/afs.service';
import { CamaraService } from './../../services/camara.service';
import { TipoPublicacion, enumTipoDeCosa } from './../../model/tipo-publicacion';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.scss'],
})
export class NuevaPublicacionComponent implements OnInit {

  @Input() tipoPublicacion: TipoPublicacion;

  foto: string;
  usuarioActual: firebase.User;
  fotoUsuarioActual: string;
  porcentaje;
  loading;

  // Como son slides hacemos esto para quitarle el efecto de pasar
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private camara: CamaraService,
    public almacenFotos: AfsService,
    private auth: AuthService,
    private controladorModal: ModalController,
    private db: DbfService,
    public loadingController: LoadingController) {

    if (this.tipoPublicacion === null) {
      this.tipoPublicacion = new TipoPublicacion(enumTipoDeCosa.COSAS_LINDAS);
    }
  }

  ngOnInit() {
    this.usuarioActual = this.auth.usuarioActual;
    const rutaFotoPerfilUsuarioActual = `/fotosperfilusuarios/${this.usuarioActual.email}.jpg`;
    this.almacenFotos.obtenerReferenciaAUnArchivo(rutaFotoPerfilUsuarioActual)
      .getDownloadURL().subscribe((foto) => { this.fotoUsuarioActual = foto });
  }

  async tomarUnaFoto() {
    this.foto = await this.camara.tomarUnaFotoCamara();
  }

  async abrirGaleria() {
    this.foto = await this.camara.abrirGaleriaFotos();
  }

  cancelarPublicacion() {
    this.foto = undefined;
  }




  async publicar() {

    // Generamos un nombre aleatorio para la foto
    const nombreFoto = Math.random().toString(36).substring(2) + '.jpg';

    // Definimos la ruta destino en Firebase
    const rutaDestinoEnFirebase = this.tipoPublicacion.pathFotos + nombreFoto;

    // Convertimos la foto en blob (que es lo que soporta firebase)
    const archivoEnBlob = await fetch(this.foto).then(r => r.blob());

    this.mostrarLoading("Publicando foto...");

    this.almacenFotos.subirArchivo2(archivoEnBlob, rutaDestinoEnFirebase, (nombreFoto) => {
      
      this.almacenFotos.downloadURL.subscribe(url => {
        // Guardamos los datos (usuario, fecha, etc.)
        this.guardarDatosPublicacion(url);

        // Ocultamos el loading
        this.loading.dismiss();

        // Ocultamos el modal
        this.controladorModal.dismiss();
      });

    });
  }



  async guardarDatosPublicacion(nombreFoto) {
    const nuevaPublicacion: IPublicacion =
    {
      'nombreFoto': await nombreFoto,
      'fechaHora': new Date(),
      'emailUsuarioCreador': this.usuarioActual.email,
      'referenciaFotoPerfilUsuario': this.fotoUsuarioActual,
      'timeStamp': + new Date(),
      'votoUsuarioActual': false
    }

    this.db.agregarPublicacion(nuevaPublicacion);

  }


  async mostrarLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: this.tipoPublicacion.claseLoading,
      spinner: "bubbles",
      message: mensaje,
      translucent: true,
      backdropDismiss: true
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}
