import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from "./categorias-productos/categorias.component";
import { CategoriasServiciosComponent } from "./categorias-servicios/categorias-servicios.component";
import { CategoriasSidebarComponent } from "./categorias-sidebar/categorias-sidebar.component";




const routes: Routes = [
    {path: 'categorias', component: CategoriasSidebarComponent,children: [
        {path: 'productos', component: CategoriasComponent},
        {path: 'servicios', component: CategoriasServiciosComponent}

    ]},
    // , children: [{path: 'pedidos/:id', component: SedePedidoComponent}
    // ]}

]


@NgModule({
    imports: [RouterModule.forRoot( routes, {useHash: true})],
    exports: [RouterModule]

})


export class categoriasRoutes{}