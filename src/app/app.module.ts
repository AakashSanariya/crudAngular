import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListImageComponent } from './Image/list-image/list-image.component';
import { AddImageComponent } from './Image/add-image/add-image.component';
import { UpdateImageComponent } from './Image/update-image/update-image.component';
import {DeleteImageComponent} from "./Image/delete-image/delete-image.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiImageService} from "./service/api-image.service";
import {Interceptor} from "./interceptor";
import {NavbarComponent} from "./navbar/navbar.component";
import {DataTablesModule} from "angular-datatables/index";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListImageComponent,
    AddImageComponent,
    UpdateImageComponent,
    DeleteImageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
  ],
  providers: [ ApiImageService, {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
