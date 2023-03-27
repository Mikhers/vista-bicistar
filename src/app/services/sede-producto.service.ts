import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SedeProductoInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class SedeProductoService {
  urlGet = 'http://localhost:8000/ver/productos';
  
  
  urlGetId = 'http://localhost:8000/ver/sedes-productos/';
  urlPost = 'http://localhost:8000/new/sedes-productos';
  urlUpdate = 'http://localhost:8000/modify/sedes-productos/';
  urlDelete = 'http://localhost:8000/delete/sedes-productos/';
  constructor(private http: HttpClient) { }

  getSedeProducto(): Observable<any>{
    return this.http.get(this.urlGet);
  }


  getSedeProducto_id_idd(id:number,idd:number):Observable<any>{
    return this.http.get(this.urlGetId + id + '/' + idd)
  }
  getIdSedeProducto(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postSedeProducto(data: SedeProductoInterface): Observable<any>{
    return this.http.post<SedeProductoInterface>(this.urlPost, data);
  }
  putSedeProducto(id:number, idd:number, data: SedeProductoInterface): Observable<any>{
    return this.http.put<SedeProductoInterface>(this.urlUpdate + id + '/' + idd, data);
  }
  deleteSedeProducto(id: number, idd:number): Observable<any>{
    return this.http.delete<SedeProductoInterface>(this.urlDelete + id + '/' + idd);
  }

}
