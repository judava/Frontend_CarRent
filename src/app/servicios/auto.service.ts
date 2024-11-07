import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  url='http://localhost/CarRent2/backend/controlador/auto.php';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}?control=consulta`);
  }
  
  eliminar(id:number) {
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }
  
  insertar(params:any) {
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify (params));
  }
  
  editar(id:number, params:any) {
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify (params));
  }
    
  filtro(dato:any) {
    return this.http.get(`${this.url}?control=filtro&dato=${dato}`);
  }
  
}
