import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Center } from '../model/center.model';
import { Image } from '../model/image.model';
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

  find(locationId: any) {
    let url = this.url + '/api/center/';
    if (locationId) {
      url += locationId;
    }
    return this.http.get(url).pipe(map( (centers: Center[]) => {
      return centers;
    }));
  }

  findById(id: number) {
    return this.http.get(`${this.url}/api/center/${id}`);
  }

  deleteCenter(id: number) {
    return this.http.delete(`${this.url}/api/center/${id}`);
  }

  findImgs(id: string) {
    return this.http.get(`${this.url}/api/center/${id}/imgs`);
  }

  contacto(nombre, apellidos, correo, telefono, mensaje) {
    const params: HttpParams = new HttpParams()
    .set('nombre', nombre)
    .set('apellidos', apellidos)
    .set('correo', correo)
    .set('telefono', telefono)
    .set('mensaje', mensaje);
    return this.http.get(this.url + '/api/mailer/contact',);
  }

  alquila(centro, nombre, correo, telefono, mensaje) {
    const params: HttpParams = new HttpParams()
    .set('centro', centro)
    .set('responsable', nombre)
    .set('correo', correo)
    .set('telefono', telefono)
    .set('mensaje', mensaje);
    return this.http.get(this.url + '/api/mailer/rent', {params, responseType: 'text'});
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
    return this.http.get(this.url + '/api/mailer/book' + centroid, {params, responseType: 'text'});
  }

  save(center: Center) {
    return this.http.post(this.url + '/api/center/', center , {responseType: 'text'});
  }

  getServicios(centroid: number) {
    return this.http.get(this.url + '/servicios/' + centroid);
  }
  calendarEvents(apiKey: string, url: string) {
    return this.http.get(url + apiKey);
  }
}
