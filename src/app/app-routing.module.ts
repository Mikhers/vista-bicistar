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

const routes: Routes = [
  {path: 'sede', component: SedeComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'sorry', component: SorryComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'productos'},
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
