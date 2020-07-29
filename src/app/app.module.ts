import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { ErrorService } from './services/error.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimpleNotificationsModule } from 'angular2-notifications';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FontAwesomeModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [
    HttpService,
    HttpClientModule,
    HttpClient,
    {
      provide: ErrorHandler,
      useClass: ErrorService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
