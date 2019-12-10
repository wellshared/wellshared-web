import { Component, OnInit } from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/model/center.model';
import { RoomTimeIntervalHeader } from 'src/app/model/room-time-interval-header.model';

@Component({
  selector: 'app-center-time-form',
  templateUrl: './center-time-form.component.html',
  styleUrls: ['./center-time-form.component.css']
})
export class CenterTimeFormComponent implements OnInit {

  center: Center;
  timeList: RoomTimeIntervalHeader[] = [];
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


}
