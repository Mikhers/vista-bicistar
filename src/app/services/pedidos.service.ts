import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidosInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  urlGetId = 'http://localhost:8000/ver/pedidos/';
  urlGet = 'http://localhost:8000/ver/pedidos';
  urlPost = 'http://localhost:8000/new/pedido';
  urlUpdate = 'http://localhost:8000/modify/pedido/';
  urlDelete = 'http://localhost:8000/delete/pedido/';
  constructor(private http: HttpClient) { }

  getPedido(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdPedido(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postPedido(data: PedidosInterface): Observable<any>{
    return this.http.post<PedidosInterface>(this.urlPost, data);
  }
  putPedido(id:number, data: PedidosInterface): Observable<any>{
    return this.http.put<PedidosInterface>(this.urlUpdate + id, data);
  }
  deletePedido(id: number): Observable<any>{
    return this.http.delete<PedidosInterface>(this.urlDelete + id);
  }
}
