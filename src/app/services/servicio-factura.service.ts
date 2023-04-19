import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioFacturaInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioFacturaService {

  urlGetId = 'http://localhost:8000/ver/servicio-venta/';
  urlGet = 'http://localhost:8000/ver/servicio-venta';
  urlPost = 'http://localhost:8000/new/servicio-venta';
  urlUpdate = 'http://localhost:8000/modify/servicio-venta/';
  urlDelete = 'http://localhost:8000/delete/servicio-venta/';
  constructor(private http: HttpClient) { }

  getServicioVenta(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdServicioVenta(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postServicioVenta(data: ServicioFacturaInterface): Observable<any>{
    return this.http.post<ServicioFacturaInterface>(this.urlPost, data);
  }
  putServicioVenta(id:number, data: ServicioFacturaInterface): Observable<any>{
    return this.http.put<ServicioFacturaInterface>(this.urlUpdate + id, data);
  }
  deleteServicioVenta(id: number): Observable<any>{
    return this.http.delete<ServicioFacturaInterface>(this.urlDelete + id);
  }
}
