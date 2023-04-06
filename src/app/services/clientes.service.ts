import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService { 

  urlGetId = 'http://localhost:8000/ver/clientes/';
  urlGet = 'http://localhost:8000/ver/clientes';
  urlPost = 'http://localhost:8000/new/cliente';
  urlUpdate = 'http://localhost:8000/modify/cliente/';
  urlDelete = 'http://localhost:8000/delete/cliente/';
  constructor(private http: HttpClient) { }

  getcliente(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdcliente(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postcliente(data: ClientesInterface): Observable<any>{
    return this.http.post<ClientesInterface>(this.urlPost, data);
  }
  putcliente(id:number, data: ClientesInterface): Observable<any>{
    return this.http.put<ClientesInterface>(this.urlUpdate + id, data);
  }
  deletecliente(id: number): Observable<any>{
    return this.http.delete<ClientesInterface>(this.urlDelete + id);
  }
}
