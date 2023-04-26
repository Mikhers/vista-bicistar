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

//PIPES
import { FilterPipe } from './pipes/filter.pipe';
import { SedeComponent } from './pages/inicio/sede.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { SedeProductoComponent } from './pages/sede-producto/sede-producto.component';
import { PeddidosComponent } from './pages/peddidos/peddidos.component';
import { FormPedidosComponent } from './pages/form-pedidos/form-pedidos.component';
import { SedesModule } from './pages/sedes/sedes.module';
import { CategoriasModule } from './pages/categorias/categorias.module';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { FormFacturaComponent } from './pages/form-factura/form-factura.component';
import { AdminModule } from './admin/admin.module';

//interseptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';


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
    FilterPipe,//pipe
    SedeComponent,
    ClientesComponent,
    SedeProductoComponent,
    PeddidosComponent,
    FormPedidosComponent,
    ServiciosComponent,
    FormFacturaComponent
  ],
  imports: [
    SedesModule,
    CategoriasModule,
    AdminModule,

    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
