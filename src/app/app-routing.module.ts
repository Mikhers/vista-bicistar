import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { ProductosComponent } from './pages/productos/productos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SorryComponent } from './pages/sorry/sorry.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { SedeComponent } from './pages/inicio/sede.component';
import { SedeProductoComponent } from './pages/sede-producto/sede-producto.component';
import { PeddidosComponent } from './pages/peddidos/peddidos.component';
import { FormPedidosComponent } from './pages/form-pedidos/form-pedidos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FormFacturaComponent } from './pages/form-factura/form-factura.component';

const routes: Routes = [
  {path: 'inicio', component: SedeComponent },
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'pedidos', component: PeddidosComponent},
  {path: 'form-pedidos', component: FormPedidosComponent},//FORM-PEDIDOS
  {path: 'form-pedidos/:id', component: FormPedidosComponent},//FORM-PEDIDOS PUT

  {path: 'empleados', component: EmpleadosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'sedes/producto/:id', component: SedeProductoComponent},

  {path: 'compras', component: ComprasComponent},
  {path: 'compras/:id', component: ComprasComponent},
  {path: 'form/factura', component: FormFacturaComponent},
  {path: 'form/factura/:id', component: FormFacturaComponent},
  
  {path: 'sorry', component: SorryComponent},
  {path: '', redirectTo:'inicio', pathMatch: 'full'},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
