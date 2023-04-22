import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdminRoutes } from './admin.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AdminModule { }
