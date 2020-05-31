import { NuevaPublicacionComponent } from './components/nueva-publicacion/nueva-publicacion.component';
import { DbfService } from './services/dbf.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';




// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'; // Login 
import { AngularFireStorageModule } from '@angular/fire/storage'; // Storage
import { AngularFirestore } from '@angular/fire/firestore'; // Base de datos


import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [AppComponent, NuevaPublicacionComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,     AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule,
    AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    AuthService,
    DbfService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
