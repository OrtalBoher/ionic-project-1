import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
// import{AngularFireDatabase} from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { Storage } from '@capacitor/storage';
import { StoragePlugin } from '@capacitor/storage';




import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  declarations: [AppComponent, FileSizePipe],
  entryComponents: [],
  imports: [
    AngularFirestoreModule,
    AngularFireAuthModule,
    //AngularFireDatabase,
    //AngularFireStorageModule,
    BrowserModule,
     IonicModule.forRoot(),
     HttpClientModule,
     AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
