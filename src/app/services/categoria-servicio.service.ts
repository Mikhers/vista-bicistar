import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaServicioInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServicioService {

  urlGet = 'http://localhost:8000/ver/categoria-servicio';
  urlGetId = 'http://localhost:8000/ver/categoria-servicio/';
  urlPost = 'http://localhost:8000/new/categoria-servicio';
  urlUpdate = 'http://localhost:8000/modify/categoria-servicio/';
  urlDelete = 'http://localhost:8000/delete/categoria-servicio/';
  constructor(private http: HttpClient) { }

    getCategoria(): Observable<any>{
      return this.http.get(this.urlGet);
    }
    getIdCategoria(id: number): Observable<any>{
      return this.http.get(this.urlGetId + id);
    }
    postCategoria(data: CategoriaServicioInterface): Observable<any>{
      return this.http.post<CategoriaServicioInterface>(this.urlPost, data);
    }
    putCategoria(id:number, data: CategoriaServicioInterface): Observable<any>{
      return this.http.put<CategoriaServicioInterface>(this.urlUpdate + id, data);
    }
    deleteCategoria(id: number): Observable<any>{
      return this.http.delete<CategoriaServicioInterface>(this.urlDelete + id);
    }
}
