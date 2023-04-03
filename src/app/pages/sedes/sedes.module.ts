import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedePedidoComponent } from './sede-pedido/sede-pedido.component';
import { SedesRoutes } from './Sedes.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SedePedidoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SedesRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SedePedidoComponent
  ]
})
export class SedesModule { }
