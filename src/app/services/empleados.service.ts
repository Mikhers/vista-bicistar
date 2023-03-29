import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadosInterface } from '../interfaces/bicistar-api.Interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  urlGetId = 'http://localhost:8000/ver/empleados/';
  urlGet = 'http://localhost:8000/ver/empleados';
  urlPost = 'http://localhost:8000/new/empleado';
  urlUpdate = 'http://localhost:8000/modify/empleado/';
  urlDelete = 'http://localhost:8000/delete/empleado/';
  constructor(private http: HttpClient) { }

  getEmpleado(): Observable<any>{
    return this.http.get(this.urlGet);
  }
  getIdEmpleado(id: number): Observable<any>{
    return this.http.get(this.urlGetId + id);
  }
  postEmpleado(data: EmpleadosInterface): Observable<any>{
    return this.http.post<EmpleadosInterface>(this.urlPost, data);
  }
  putEmpleado(id:number, data: EmpleadosInterface): Observable<any>{
    return this.http.put<EmpleadosInterface>(this.urlUpdate + id, data);
  }
  deleteEmpleado(id: number): Observable<any>{
    return this.http.delete<EmpleadosInterface>(this.urlDelete + id);
  }
}
