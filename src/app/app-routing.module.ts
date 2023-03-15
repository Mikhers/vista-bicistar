import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { ProductosComponent } from './pages/productos/productos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SorryComponent } from './pages/sorry/sorry.component';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'sorry', component: SorryComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
