import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from './services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  existeVariable=false;

  AppComponent(): AppComponent{
    return this
  }

  constructor(
    public _servise: InfoPaginaService,
    private router: Router){  }
  
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.existeVariable = true;
      this.router.navigate(["inicio"]);
    }else{
      this.existeVariable = false;
      this.router.navigate(["login"]);
    }
  }
  recargarPagina() {
    location.reload();
  }
}
