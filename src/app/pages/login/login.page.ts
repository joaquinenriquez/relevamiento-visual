import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // #region Atributos

  unUsuario: Usuario = new Usuario();

  usuariosTesting: Usuario[] =
    [
      { "id": 1, "email": "admin@admin.com", "password": "111111", "perfil": "admin", "sexo": "femenino" },
      { "id": 2, "email": "invitado@invitado.com", "password": "222222", "perfil": "invitado", "sexo": "femenino" },
      { "id": 3, "email": "usuario@usuario.com", "password": "333333", "perfil": "usuario", "sexo": "masculino" },
      { "id": 4, "email": "anonimo@anonimo.com", "password": "444444", "perfil": "usuario", "sexo": "masculino" },
      { "id": 5, "email": "tester@tester.com", "password": "666666", "perfil": "tester", "sexo": "femenino" },
    ];

  opcionesDelActionSheet: any = {
    header: 'Usuarios para pruebas',
    cancelText: 'Dismiss'
  };

  mostrarSpinner = false;
  pausarSpinner = false;

  loginForm: FormGroup;

  // #endregion

  constructor(private authSvc: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
  }

  // #region Méotodos


  async iniciarSesion() {

    if (this.loginForm.invalid) {
      return;
    }

    // Hacemos esto porque nuestro servicio espera un objeto del tipo usuario
    this.unUsuario.email = this.loginForm.get("email").value;
    this.unUsuario.password = this.loginForm.get("password").value;

    const usuarioLogeado = await (this.authSvc.onLogin(this.unUsuario)); // Usuamos await porque tenemos que esperar la respuesta del servidor

    this.mostrarSpinner = true;

    setTimeout(() => {
      this.mostrarSpinner = false;

      if (usuarioLogeado) // Si nos devulve algo distinto de null entonces el usuario esta logeado (?)
      {
        console.log("Usuario logeado correctamente");
        this.router.navigateByUrl('/home');
      }
    }, 3000);

  }

  cambioDeUsuario(event) {
    let idSeleccionado = event.detail.value; // Nos quedamos con el id del usuario seleccionado

    let usuarioSeleccionado = this.usuariosTesting.filter(unUsuarioTesting => unUsuarioTesting.id == idSeleccionado)[0];

    // Asignamos los valores a los input a traves del form
    this.loginForm.controls['email'].setValue(usuarioSeleccionado.email);
    this.loginForm.controls["password"].setValue(usuarioSeleccionado.password);

  }

  // #endregion

}