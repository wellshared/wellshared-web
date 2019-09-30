import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CenterService {

  url = environment.url;
  constructor(private http: HttpClient) { }

  findByQty(qty: number) {
    const params: HttpParams = new HttpParams().set('qty', String(qty));
    return this.http.get(this.url, {params}).pipe(map( (centros: any[]) => {
      return centros;
    }));
  }

  findAll() {
    return this.http.get(this.url + '/centers').pipe(map( (centros: any[]) => {
      return Object.values(centros);
    }));
  }

  findByLoc(loc) {
    return this.http.get(`${this.url}/salas/${loc}`).pipe(map( (centros: any[]) => {
    return Object.values(centros);
    }));
  }

  findById(id: string) {
    return this.http.get(`${this.url}/centro/${id}`).pipe(map( (centros: any[]) => {
      return Object.values(centros);
    }));
  }

  findImgs(id: string) {
    return this.http.get(`${this.url}/img/${id}`).pipe(map( (imgs: any[]) => {
      return Object.values(imgs);
    }));
  }

  contacto(nombre, apellidos, correo, telefono, mensaje) {
    const params: HttpParams = new HttpParams()
    .set('nombre', nombre)
    .set('apellidos', apellidos)
    .set('correo', correo)
    .set('telefono', telefono)
    .set('mensaje', mensaje);
    return this.http.get(this.url + '/contacto', {params, responseType: 'text'});
  }

  alquila(centro, nombre, correo, telefono, mensaje) {
    const params: HttpParams = new HttpParams()
    .set('centro', centro)
    .set('responsable', nombre)
    .set('correo', correo)
    .set('telefono', telefono)
    .set('mensaje', mensaje);
    return this.http.get(this.url + '/alquila', {params, responseType: 'text'});
  }

  reserva(centroid, nombre, apellido, numero, correo, telefono, fecha, horaDesde, horaHasta) {
    const params: HttpParams = new HttpParams()
    .set('nombre', nombre)
    .set('apellido', apellido)
    .set('numero', numero)
    .set('correo', correo)
    .set('telefono', telefono)
    .set('fecha', `${fecha.day}/${fecha.month}/${fecha.year}`)
    .set('horaDesde', horaDesde)
    .set('horaHasta', horaHasta);
    return this.http.get(this.url + '/reserva/' + centroid, {params, responseType: 'text'});
  }

  getServicios(centroid: number) {
    return this.http.get(this.url + '/servicios/' + centroid);
  }
  calendarEvents(apiKey: string, url: string) {
    return this.http.get(url + apiKey);
  }
}
