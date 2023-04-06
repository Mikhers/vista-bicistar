import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiciosInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  
  urlGetId = 'http://localhost:8000/ver/servicios/';
  urlGet = 'http://localhost:8000/ver/servicios';
  urlPost = 'http://localhost:8000/new/servicio';
  urlUpdate = 'http://localhost:8000/modify/servicios/';
  urlDelete = 'http://localhost:8000/delete/servicio/';
  constructor(private http: HttpClient) { }

  getservicio(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdservicio(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postservicio(data: ServiciosInterface): Observable<any>{
    return this.http.post<ServiciosInterface>(this.urlPost, data);
  }
  putservicio(id:number, data: ServiciosInterface): Observable<any>{
    return this.http.put<ServiciosInterface>(this.urlUpdate + id, data);
  }
  deleteservicio(id: number): Observable<any>{
    return this.http.delete<ServiciosInterface>(this.urlDelete + id);
  }
}
