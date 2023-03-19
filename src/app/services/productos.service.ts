import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { productoInteface } from '../interfaces/producto-Interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  url = 'http://localhost:8000/ver/productos';
  constructor(private http: HttpClient) { }

    getProducto(): Observable<any>{
      return this.http.get(this.url);
    }

}


