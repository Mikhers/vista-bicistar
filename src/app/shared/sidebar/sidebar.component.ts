import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { SedeService } from 'src/app/services/sede.service';
import { SedeInterface } from 'src/app/interfaces/bicistar-api.Interface';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {
  expandida=false;
  expandidaSs=false;
  id!: number;


  sedes: SedeInterface[]=[];
  ngOnInit(){
    this.getSede();

  }
  goBack(): void {
    this.location.back();
  }
  refresh(): void {
    const currentUrl = this.router.url;
    const uniqueParam = new Date().getTime();
    this.router.navigate([currentUrl], { queryParams: { unique: uniqueParam } });
  }
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public _servicio: InfoPaginaService,
    private _sede: SedeService
    ){}

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

