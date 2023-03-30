import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoProductoInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {
  urlGet = 'http://localhost:8000/ver/productos';
  
  
  urlGetId = 'http://localhost:8000/ver/pedido-producto/';
  urlPost = 'http://localhost:8000/new/pedido-producto';
  urlUpdate = 'http://localhost:8000/modify/pedido-producto/';
  urlDelete = 'http://localhost:8000/delete/pedido-producto/';
  constructor(private http: HttpClient) { }

  getSedeProducto(): Observable<any>{
    return this.http.get(this.urlGet);
  }


  getSedeProducto_id_idd(id:number,idd:number):Observable<any>{
    return this.http.get(this.urlGetId + id + '/' + idd)
  }
  getIdPedidoProducto(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postSedeProducto(data: PedidoProductoInterface): Observable<any>{
    return this.http.post<PedidoProductoInterface>(this.urlPost, data);
  }
  putSedeProducto(id:number, idd:number, data: PedidoProductoInterface): Observable<any>{
    return this.http.put<PedidoProductoInterface>(this.urlUpdate + id + '/' + idd, data);
  }
  deleteSedeProducto(id: number, idd:number): Observable<any>{
    return this.http.delete<PedidoProductoInterface>(this.urlDelete + id + '/' + idd);
  }
}
