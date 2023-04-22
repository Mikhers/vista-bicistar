import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: 'login', component: LoginComponent}
]


@NgModule({
    imports: [RouterModule.forRoot( routes, {useHash: true})],
    exports: [RouterModule]

})


export class AdminRoutes{}