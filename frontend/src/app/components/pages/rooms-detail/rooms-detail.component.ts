import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Marker } from 'src/app/model/marker.model';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/model/center.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/utils/constants';
import { Service } from '../../../model/service.model';
import { Image } from 'src/app/model/image.model';

@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})
export class RoomsDetailComponent implements OnInit {
  zoom = 8;
  lat = 41.406413;
  lng = 2.162171;
  markers: Marker[] = [];
  calendarPlugins = [timeGridPlugin];
  customButtons: any;
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  header = {};
  buttonText = {
    today:    'Hoy',
    month:    'Mes',
    week:     'Semana'
  };
  calendarApi: any;
  center: Center;
  imagePosition = 0;
  images: Image[] = [];
  formGroup: FormGroup;
  horas: string[] = Constants.hours;
  constructor(private centerService: CenterService, private route: ActivatedRoute, private calendar: NgbCalendar) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(undefined, Validators.required),
      sname: new FormControl(undefined, Validators.required),
      number: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
      date: new FormControl(this.calendar.getToday(), Validators.required),
      timeFrom: new FormControl({hour: 0, minute: 0}, Validators.required),
      timeTo: new FormControl({hour: 0, minute: 0}, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.centerService.findById(params.id).subscribe((center: Center) => {
          this.center = center;
          this.imagePosition = 0;
          this.lat =  Number(this.center.lat);
          this.lng = Number(this.center.lon);
          this.markers[0] = new Marker(
          this.center.lat, this.center.lon, false, this.center.name,
          this.center.adress, this.center.price, this.center.mainImage, this.center.id);
          this.getCalendarEvents();
          this.centerService.findImgs(params.id).subscribe((imgs: Image[]) => {
            this.images = imgs;
          });
        });
      }
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.centerService
      .reserva(
        this.center.id,
        this.formGroup.value.name,
        this.formGroup.value.sname,
        this.formGroup.value.number,
        this.formGroup.value.email,
        this.formGroup.value.phone,
        this.formGroup.value.date,
        this.formGroup.value.timeFrom,
        this.formGroup.value.timeTo).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }
  selectImage(index: number) {
    if (this.imagePosition === (this.images.length - 1 )) {
      this.imagePosition = 0;
    } else if ((this.imagePosition + index) < 0 ) {
      this.imagePosition = this.images.length - 1;
    } else if ((this.imagePosition + index) > this.images.length) {
      this.imagePosition = 0;
    } else {
      this.imagePosition = this.imagePosition + index;
    }
  }
  getCalendarEvents() {
    this.centerService.calendarEvents(Constants.CALENDAR_API_KEY, this.center.url).subscribe((calendar: any) => {
      calendar.items.forEach((item: any) => {
        if (this.calendarComponent) {
          this.calendarComponent.getApi().addEvent({
            title: item.summary,
            start: moment(item.start.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
            end: moment(item.end.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
            allDay: false,
            color: (item.summary === 'Lliure/Libre') ? '#0b8043' : '#d50000'
          });
        }
      });
    });
  }

}
