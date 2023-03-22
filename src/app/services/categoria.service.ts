import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//CATEGORIA PRODUCTO
import { categoriaInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlGet = 'http://localhost:8000/ver/categoria-producto';
  urlGetId = 'http://localhost:8000/ver/categoria-producto/';
  urlPost = 'http://localhost:8000/new/categoria-producto';
  urlUpdate = 'http://localhost:8000/modify/categoria-producto/';
  urlDelete = 'http://localhost:8000/delete/categoria-producto/';
  constructor(private http: HttpClient) { }

    getCategoria(): Observable<any>{
      return this.http.get(this.urlGet);
    }
    getIdCategoria(id: number): Observable<any>{
      return this.http.get(this.urlGetId + id);
    }
    postCategoria(data: categoriaInterface): Observable<any>{
      return this.http.post<categoriaInterface>(this.urlPost, data);
    }
    putCategoria(id:number, data: categoriaInterface): Observable<any>{
      return this.http.put<categoriaInterface>(this.urlUpdate + id, data);
    }
    deleteCategoria(id: number): Observable<any>{
      return this.http.delete<categoriaInterface>(this.urlDelete + id);
    }
}
