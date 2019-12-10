import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Center } from '../model/center.model';
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
      url += 'location/' + locationId;
    }
    return this.http.get(url).pipe(map( (centers: Center[]) => {
      return centers;
    }));
  }

  findById(id: number) {
    return this.http.get(`${this.url}/api/center/${id}`);
  }

  deleteCenter(id: number) {
    return this.http.delete(`${this.url}/api/center/${id}`, {responseType: 'text'});
  }

  findImgs(id: number) {
    return this.http.get(`${this.url}/api/center/${id}/imgs`);
  }

  save(center: Center) {
    return this.http.post(this.url + '/api/center/', center , {responseType: 'text'});
  }

  loadImg(centerId: number, file: File) {
    const headers = new HttpHeaders()
    .append('Content-Type', 'multipart/form-data')
    .append('Accept', 'application/json');
    const img = new FormData();
    img.append('file', file, file.name);
    return this.http.post(this.url + '/api/center/img/' + centerId, img , {
      headers,
      responseType: 'text',
      reportProgress: true,
      observe: 'events'
    });
  }

  findTimeIntervals(id: number) {
    return this.http.get(`${this.url}/api/center/${id}/intervals`);
  }

  getServicios(centroid: number) {
    return this.http.get(this.url + '/servicios/' + centroid);
  }
  calendarEvents(apiKey: string, url: string) {
    return this.http.get(url + apiKey);
  }
}
