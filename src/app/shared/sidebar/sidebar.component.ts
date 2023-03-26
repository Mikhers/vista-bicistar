import { Component } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { SedeService } from 'src/app/services/sede.service';
import { SedeInterface } from 'src/app/interfaces/bicistar-api.Interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sedes: SedeInterface[]=[];
  ngOnInit(): void{
    this.getSede();
  }
  constructor(
    public _servicio: InfoPaginaService,
    private _sede: SedeService
    ){}

  /*METODOS HTTP*/
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    })
  }
}

