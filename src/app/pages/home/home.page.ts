import { TipoPublicacion, enumTipoDeCosa } from './../../model/tipo-publicacion';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public publicacionSeleccionada: TipoPublicacion; 

  constructor(private router: Router) {}

  botonCosasLindas_Click() 
  {
    this.publicacionSeleccionada = new TipoPublicacion(enumTipoDeCosa.COSAS_LINDAS);
    this.router.navigateByUrl('publicaciones/', {state: this.publicacionSeleccionada});
  }

  botonCosasFeas_Click()
  {
    this.publicacionSeleccionada = new TipoPublicacion(enumTipoDeCosa.COSAS_FEAS);
    this.router.navigateByUrl('publicaciones/', {state: this.publicacionSeleccionada});
  }

}
