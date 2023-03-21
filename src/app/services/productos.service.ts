import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//INTERFACE
import { productoInteface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlGetId = 'http://localhost:8000/ver/productos/';
  urlGet = 'http://localhost:8000/ver/productos';
  urlPost = 'http://localhost:8000/new/producto';
  urlUpdate = 'http://localhost:8000/modify/producto/';
  urlDelete = 'http://localhost:8000/delete/producto/';
  constructor(private http: HttpClient) { }

  getProducto(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdProducto(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postProducto(data: productoInteface[]): Observable<any>{
    return this.http.post<productoInteface>(this.urlPost, data);
  }
  putProducto(id:number, data: productoInteface): Observable<any>{
    return this.http.put<productoInteface>(this.urlUpdate + id, data);
  }
  deleteProducto(id: number): Observable<any>{
    return this.http.delete<productoInteface>(this.urlDelete + id);
  }

}


