import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//MENSAJES BONITOS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//FORMS
import { ReactiveFormsModule } from '@angular/forms';

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
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
