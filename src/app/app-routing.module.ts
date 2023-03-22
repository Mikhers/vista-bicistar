import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { ProductosComponent } from './pages/productos/productos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SorryComponent } from './pages/sorry/sorry.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'sorry', component: SorryComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'productos'},
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
