import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { ProductosComponent } from './pages/productos/productos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SorryComponent } from './pages/sorry/sorry.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { SedeComponent } from './pages/sede/sede.component';
import { SedeProductoComponent } from './pages/sede-producto/sede-producto.component';
import { PeddidosComponent } from './pages/peddidos/peddidos.component';
import { FormPedidosComponent } from './pages/form-pedidos/form-pedidos.component';

const routes: Routes = [
  {path: 'inicio', component: SedeComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'pedidos', component: PeddidosComponent},
  {path: 'form-pedidos', component: FormPedidosComponent},//FORM-PEDIDOS
  {path: 'form-pedidos/:id', component: FormPedidosComponent},//FORM-PEDIDOS PUT
  {path: 'categorias', component: CategoriasComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'sedes/producto/:id', component: SedeProductoComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'sorry', component: SorryComponent},
  {path: '', redirectTo:'inicio', pathMatch: 'full'},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
