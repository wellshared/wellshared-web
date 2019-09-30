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
import { Image } from 'src/app/model/image.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/utils/constants';
import { Service } from '../../../model/service.model';

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
  servicios: Service[] = [];
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  header = {};
  buttonText = {
    today:    'Hoy',
    month:    'Mes',
    week:     'Semana'
  };
  calendarApi: any;
  Center: Center;
  Image = 0;
  Imagees: any[] = [];
  formGroup: FormGroup;
  horas: string[] = Constants.hours;
  constructor(private CenterService: CenterService, private route: ActivatedRoute, private calendar: NgbCalendar) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(undefined, Validators.required),
      sname: new FormControl(undefined, Validators.required),
      number: new FormControl(undefined, Validators.required),
      emaik: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
      date: new FormControl(this.calendar.getToday(), Validators.required),
      timeFrom: new FormControl({hour: 0, minute: 0}, Validators.required),
      timeTo: new FormControl({hour: 0, minute: 0}, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.CenterService.findById(params.id).subscribe((data: any) => {
          this.Center = data[0];
          this.Image = 0;
          this.lat =  Number(this.Center.lat);
          this.lng = Number(this.Center.lon);
          this.markers[0] = new Marker(
            this.Center.lat, this.Center.lon, false, this.Center.name,
            this.Center.adress, this.Center.price, this.Center.img, this.Center.id);
          this.getCalendarEvents();
          this.CenterService.findImgs(params.id).subscribe(img => {
            this.Imagees = img;
          });
        });
      }
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.CenterService
      .reserva(
        this.Center.id,
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
  seleccionaImage(index: number) {
    if(this.Image === (this.Imagees.length -1 )) {
      this.Image = 0;
    } else if ((this.Image + index) < 0 ) {
      this.Image = this.Imagees.length - 1;
    } else if ((this.Image + index) > this.Imagees.length) {
      this.Image = 0;
    } else {
      this.Image = this.Image + index;
    }
  }
  getCalendarEvents() {
    this.CenterService.calendarEvents(Constants.CALENDAR_API_KEY, this.Center.url).subscribe((calendar: any) => {
      calendar.items.forEach((item: any) => {
        if (this.calendarComponent) {
          this.calendarComponent.getApi().addEvent({
            title: item.summary,
            start: moment(item.start.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
            end: moment(item.end.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
            allDay: false,
            color: (item.summary === 'Lliure/Libre') ? '#0b8043': '#d50000'
          });
        }
      });
    });
  }

}
