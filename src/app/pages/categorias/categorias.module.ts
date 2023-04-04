import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//COMPONENTS
import { CategoriasComponent } from './categorias-productos/categorias.component';
import { CategoriasServiciosComponent } from './categorias-servicios/categorias-servicios.component';
import { CategoriasSidebarComponent } from './categorias-sidebar/categorias-sidebar.component';
import { categoriasRoutes } from './categorias.routes';



@NgModule({
  declarations: [
    CategoriasComponent,
    CategoriasServiciosComponent,
    CategoriasSidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    categoriasRoutes,
    FormsModule,
    BrowserModule
  ],
  exports: [
    CategoriasComponent,
    CategoriasServiciosComponent,
    CategoriasSidebarComponent
  ]
})
export class CategoriasModule { }
