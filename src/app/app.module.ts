import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { Interceptor } from './app.interceptor';
import { TokenStorage } from './token.storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TokenStorage,{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
