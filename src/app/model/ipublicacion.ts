export interface IPublicacion {
    id?: string;
    nombreFoto: string;
    fechaHora: Date;
    emailUsuarioCreador: string;
    referenciaFotoPerfilUsuario: string; // Esto esta mal que este aca pero es lo mas rapido en este momento :S
    timeStamp: number;
    votoUsuarioActual: boolean;

}
