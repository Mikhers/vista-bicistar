import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:8000/ver/categoria-producto';
  constructor(private http: HttpClient) { }

    getCategoria(): Observable<any>{
      return this.http.get(this.url);
    }
}
