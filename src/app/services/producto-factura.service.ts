import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoFacturaInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoFacturaService {

  urlGetId = 'http://localhost:8000/ver/producto-venta/';
  urlGet = 'http://localhost:8000/ver/producto-venta';
  urlPost = 'http://localhost:8000/new/producto-venta';
  urlUpdate = 'http://localhost:8000/modify/producto-venta/';
  urlDelete = 'http://localhost:8000/delete/producto-venta/';
  constructor(private http: HttpClient) { }

  getProductoVenta(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdProductoVenta(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postProductoVenta(data: ProductoFacturaInterface): Observable<any>{
    return this.http.post<ProductoFacturaInterface>(this.urlPost, data);
  }
  putProductoVenta(id:number, data: ProductoFacturaInterface): Observable<any>{
    return this.http.put<ProductoFacturaInterface>(this.urlUpdate + id, data);
  }
  deleteProductoVenta(id: number): Observable<any>{
    return this.http.delete<ProductoFacturaInterface>(this.urlDelete + id);
  }
}
