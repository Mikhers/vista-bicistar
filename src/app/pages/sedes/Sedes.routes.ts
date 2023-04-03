import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';


import { SedePedidoComponent } from "./sede-pedido/sede-pedido.component";


const routes: Routes = [
    {path: 'sedes/pedidos/:id', component: SedePedidoComponent}
    // , children: [{path: 'pedidos/:id', component: SedePedidoComponent}
    // ]}

]


@NgModule({
    imports: [RouterModule.forRoot( routes, {useHash: true})],
    exports: [RouterModule]

})


export class SedesRoutes{}