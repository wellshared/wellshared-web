import { Component, OnInit } from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/model/center.model';
import { RoomTimeIntervalHeader } from 'src/app/model/room-time-interval-header.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/utils/constants';
import { RoomDetailDto } from 'src/app/model/dto/room-detail-dto.model';
import { RoomHeaderDto } from 'src/app/model/dto/room-header-dto.model';

@Component({
  selector: 'app-center-time-form',
  templateUrl: './center-time-form.component.html',
  styleUrls: ['./center-time-form.component.css']
})
export class CenterTimeFormComponent implements OnInit {

  center: Center;
  timeList: RoomTimeIntervalHeader[] = [];
  horas: string[] = Constants.hours;
  timeFrom: string;
  timeTo: string;
  dayFrom: Date;
  dayTo: Date;
  constructor(private centerService: CenterService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.centerService.findById(params.id).subscribe((center: Center) => {
          this.center = center;
          this.findTimeIntervals();
        });
      }
    });
  }

  findTimeIntervals() {
    this.centerService.findTimeIntervals(this.center.id).subscribe((list: RoomTimeIntervalHeader[]) => {
      this.timeList = list;
    });
  }

  saveHeader() {
    const roomHeader = new RoomHeaderDto(this.dayFrom, this.dayTo);
    this.centerService.saveIntervalHeader(this.center.id, roomHeader).subscribe(() => {
      this.findTimeIntervals();
      this.dayFrom = undefined;
      this.dayTo = undefined;
    });
  }

  saveDetail(id: number) {
    const roomDetail = new RoomDetailDto(this.timeFrom, this.timeTo);
    this.centerService.saveIntervalDetail(id, roomDetail).subscribe(() => {
      this.findTimeIntervals();
      this.timeFrom = undefined;
      this.timeTo = undefined;
    });
  }

}
