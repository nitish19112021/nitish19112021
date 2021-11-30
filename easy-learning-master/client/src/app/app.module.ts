import { LayoutModule } from '../app/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

import { AppComponent } from './app.component';
 import { AngularFireModule  } from '@angular/fire';
 import { AngularFireAuthModule } from "@angular/fire/auth";
 
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ServiceLoginComponent } from './core/service-login/service-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseConfig } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    ServiceLoginComponent
    /*CoursesComponent,*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [NgxSpinnerService],
  exports:[],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
