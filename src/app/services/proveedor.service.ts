import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedorInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  // urlGetId = 'http://localhost:8000/ver/Proveedors/';
  urlGet = 'http://localhost:8000/ver/proveedores';
  urlPost = 'http://localhost:8000/new/proveedor';
  urlUpdate = 'http://localhost:8000/modify/proveedor/';
  urlDelete = 'http://localhost:8000/delete/proveedor/';
  constructor(private http: HttpClient) { }

  getProveedor(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  // getIdProveedor(id: number): Observable<any>{
  //   return this.http.get(this.urlGetId + id);
  // }
  postProveedor(data: ProveedorInterface): Observable<any>{
    return this.http.post<ProveedorInterface>(this.urlPost, data);
  }
  putProveedor(id:number, data: ProveedorInterface): Observable<any>{
    return this.http.put<ProveedorInterface>(this.urlUpdate + id, data);
  }
  deleteProveedor(id: number): Observable<any>{
    return this.http.delete<ProveedorInterface>(this.urlDelete + id);
  }
}
