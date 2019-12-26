import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoomDetailDto } from '../model/dto/room-detail-dto.model';
import { RoomHeaderDto } from '../model/dto/room-header-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RoomTimeIntervalService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  findTimeIntervals(id: number) {
    return this.http.get(`${this.url}/api/intervals/center/${id}`);
  }

  saveIntervalHeader(id: number, roomHeader: RoomHeaderDto) {
    return this.http.post(`${this.url}/api/intervals/center/${id}`, roomHeader,  {responseType: 'text'});
  }

  saveIntervalDetail(id: number, roomDetail: RoomDetailDto) {
    return this.http.post(`${this.url}/api/intervals/${id}/detail`, roomDetail,  {responseType: 'text'});
  }

  deleteRoomTimeIntervalHeader(id: number) {
    return this.http.delete(`${this.url}/api/intervals/${id}`,  {responseType: 'text'});
  }

  deleteRoomTimeIntervalDetail(id: number) {
    return this.http.delete(`${this.url}/api/intervals/detail/${id}`, {responseType: 'text'});
  }
}
