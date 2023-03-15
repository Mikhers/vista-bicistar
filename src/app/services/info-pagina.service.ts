import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina ={};
  cargada = false;


  constructor(private http: HttpClient) {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (res: infoPagina)=> {
      this.cargada=true;
      this.info=res;
      console.log(res);
    });

   }
}
 

