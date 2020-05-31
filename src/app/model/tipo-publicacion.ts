export enum enumTipoDeCosa {
    COSAS_LINDAS = 'cosaslindas',
    COSAS_FEAS = 'cosasfeas'
}

export class TipoPublicacion {

    // #region Atributos

    tipoDeCosa: enumTipoDeCosa;
    titulo: string;
    pathIcono: string;
    colorPrincipal: string;
    colorSecundario: string;
    pathFotos: string;
    nombreColeccion: string;
    claseToast: string;
    claseLoading: string;

    // #endregion

    constructor(tipoDeCosa: enumTipoDeCosa) {

        switch (tipoDeCosa) {

            case enumTipoDeCosa.COSAS_LINDAS: {
                this.tipoDeCosa = enumTipoDeCosa.COSAS_LINDAS;
                this.titulo = 'Cosas Lindas';
                this.pathIcono = 'assets/svg/cosaslindas_outline.svg';
                this.colorPrincipal = 'colorcosaslindas';
                this.colorSecundario = 'cosaslindas_secundario';
                this.pathFotos = 'cosaslindas/';
                this.nombreColeccion = 'publicacionesCosasLindas';
                this.claseToast = 'cosas-lindas-toast';
                this.claseLoading = 'cosas-lindas-loading';

                break;
            }

            case enumTipoDeCosa.COSAS_FEAS: {
                this.tipoDeCosa = enumTipoDeCosa.COSAS_FEAS;
                this.titulo = 'Cosas Feas';
                this.pathIcono = 'assets/svg/cosasfeas_outline.svg';
                this.colorPrincipal = 'colorcosasfeas';
                this.colorSecundario = 'cosasfeas_secundario';
                this.pathFotos = 'cosasfeas/';
                this.nombreColeccion = 'publicacionesCosasFeas';
                this.claseToast = 'cosas-feas-toast';
                this.claseLoading = 'cosas-feas-loading';
                break;
            }
        }
    }
}
