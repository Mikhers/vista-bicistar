import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SedeInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  urlGet = 'http://localhost:8000/ver/sedes';
  urlGetId = 'http://localhost:8000/ver/sede/';
  urlPost = 'http://localhost:8000/new/sede';
  urlUpdate = 'http://localhost:8000/modify/sede/';
  urlDelete = 'http://localhost:8000/delete/sede/';
  constructor(private http: HttpClient) { }

    getSede(): Observable<any>{
      return this.http.get(this.urlGet);
    }
    getIdSede(id: number): Observable<any>{
      return this.http.get(this.urlGetId + id);
    }
    postSede(data: SedeInterface): Observable<any>{
      return this.http.post<SedeInterface>(this.urlPost, data);
    }
    putSede(id:number, data: SedeInterface): Observable<any>{
      return this.http.put<SedeInterface>(this.urlUpdate + id, data);
    }
    deleteSede(id: number): Observable<any>{
      return this.http.delete<SedeInterface>(this.urlDelete + id);
    }
}
