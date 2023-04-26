import { Component } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { SedeService } from 'src/app/services/sede.service';
import { SedeInterface } from 'src/app/interfaces/bicistar-api.Interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  expandida=false;
  expandidaSs=false;
  id!: number;
  instanciaDeLaClase!: AppComponent;

  
  sedes: SedeInterface[]=[];
  constructor(
    private location: Location,
    // private router: Router,
    public _servicio: InfoPaginaService,
    private _sede: SedeService,
    private _auth: AuthService
    ){}
  ngOnInit(){
    this.getSede();
  }
  logout(){
    this._auth.logout();
  }
  goBack(): void {
    this.location.back();
  }


  /*METODOS HTTP*/
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    })
  }
  expandidaS(){
    this.expandidaSs=!this.expandidaSs;
  }
  expandidaSede(){
    this.expandida=!this.expandida;
  }
}

