import { Usuario } from './../model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { FirebaseAppConfig } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public estaLogeado: any = false;
  public usuarioActual: firebase.User;

  constructor(public afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(unUsuario => this.estaLogeado = true); 
    afAuth.onAuthStateChanged( (user) => this.usuarioActual = user);
  }

  async onLogin(usuario: Usuario) {
    try {
      return await this.afAuth.signInWithEmailAndPassword
        (
          usuario.email,
          usuario.password
        );
    }
    catch (error) {
      console.log('Error al logear', error);
    }
  }


  async onRegister(usuario: Usuario)
  {
    try 
    {
      return await this.afAuth.createUserWithEmailAndPassword
      (
        usuario.email,
        usuario.password
      );   
    } catch (error)
    {
      console.log("Error al intentar registar");
    }    
  }


}
