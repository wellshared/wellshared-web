import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.url + '/api/locations/');
  }
}
