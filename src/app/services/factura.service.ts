import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facturasInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class facturaService {

  urlGetId = 'http://localhost:8000/ver/facturas/';
  urlGet = 'http://localhost:8000/ver/facturas';
  urlPost = 'http://localhost:8000/new/factura';
  urlUpdate = 'http://localhost:8000/modify/factura/';
  urlDelete = 'http://localhost:8000/delete/factura/';
  constructor(private http: HttpClient) { }

  getfactura(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdfactura(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postfactura(data: facturasInterface): Observable<any>{
    return this.http.post<facturasInterface>(this.urlPost, data);
  }
  putfactura(id:number, data: facturasInterface): Observable<any>{
    return this.http.put<facturasInterface>(this.urlUpdate + id, data);
  }
  deletefactura(id: number): Observable<any>{
    return this.http.delete<facturasInterface>(this.urlDelete + id);
  }
}
