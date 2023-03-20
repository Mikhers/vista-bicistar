import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//INTERFACE
import { productoInteface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  url = 'http://localhost:8000/ver/productos';
  constructor(private http: HttpClient) { }

  getProducto(): Observable<any>{
    return this.http.get(this.url);
  }
  postProducto(data: productoInteface): Observable<any>{
    return this.http.post<productoInteface>(this.url, data);
  }
  putProducto(data: productoInteface): Observable<any>{
    return this.http.put<productoInteface>(this.url, data);
  }

}


