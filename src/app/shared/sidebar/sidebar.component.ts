import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { SedeService } from 'src/app/services/sede.service';
import { SedeInterface } from 'src/app/interfaces/bicistar-api.Interface';
import { Router,ActivatedRoute } from '@angular/router';

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
    this.route.params.subscribe(params => {
      // Cargar los datos del producto con el nuevo id
      const id = +params['id']; // El signo más convierte el parámetro a número
      // Llamar a una función para cargar los datos del producto
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _servicio: InfoPaginaService,
    private _sede: SedeService
    ){}
    cambiarSede(id: number) {
      this.router.navigate(['/producto-sede', id]);
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

