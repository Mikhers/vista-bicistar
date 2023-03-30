import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//MENSAJES BONITOS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//FORMS
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//peticiones http
import { HttpClientModule } from '@angular/common/http';

//rutas
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { SorryComponent } from './pages/sorry/sorry.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

//PIPES
import { FilterPipe } from './pipes/filter.pipe';
import { SedeComponent } from './pages/sede/sede.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { SedeProductoComponent } from './pages/sede-producto/sede-producto.component';
import { PeddidosComponent } from './pages/peddidos/peddidos.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    ProveedoresComponent,
    EmpleadosComponent,
    SorryComponent,
    ComprasComponent,
    FilterPipe,
    CategoriasComponent,
    SedeComponent,
    ClientesComponent,
    SedeProductoComponent,
    PeddidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
