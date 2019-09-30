import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CentrosService } from 'src/app/services/centros.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Marker } from 'src/app/model/marker.model';
import { ActivatedRoute } from '@angular/router';
import { Centro } from 'src/app/model/centro.model';
import { Imagen } from 'src/app/model/imagen.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentroServicio } from 'src/app/model/centro-servicio.model';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constantes } from 'src/app/utils/constantes';

@Component({
  selector: 'app-salas-detail',
  templateUrl: './salas-detail.component.html',
  styleUrls: ['./salas-detail.component.css']
})
export class SalasDetailComponent implements OnInit {
  zoom = 8;
  lat = 41.406413;
  lng = 2.162171;
  markers: Marker[] = [];
  calendarPlugins = [timeGridPlugin];
  customButtons: any;
  servicios: CentroServicio[] = [];
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  header = {};
  buttonText = {
    today:    'Hoy',
    month:    'Mes',
    week:     'Semana'
  };
  calendarApi: any;
  centro: Centro;
  imagen = 0;
  imagenes: any[] = [];
  formGroup: FormGroup;
  horas: string[] = Constantes.horas;
  constructor(private centrosService: CentrosService, private route: ActivatedRoute, private calendar: NgbCalendar) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      nombre: new FormControl(undefined, Validators.required),
      apellido: new FormControl(undefined, Validators.required),
      numero: new FormControl(undefined, Validators.required),
      correo: new FormControl(undefined, Validators.required),
      telefono: new FormControl(undefined, Validators.required),
      date: new FormControl(this.calendar.getToday(), Validators.required),
      timeDesde: new FormControl({hour: 0, minute: 0}, Validators.required),
      timeHasta: new FormControl({hour: 0, minute: 0}, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.centrosService.findById(params.id).subscribe((data: any) => {
          this.centro = data[0];
          this.imagen = 0;
          this.centrosService.getServicios(this.centro.id).subscribe((servicios: CentroServicio[]) => {
            this.servicios = Object.values(servicios);
          });
          this.lat =  Number(this.centro.lat);
          this.lng = Number(this.centro.lang);
          this.markers[0] = new Marker(
            this.centro.lat, this.centro.lang, false, this.centro.nombre,
            this.centro.direccion, this.centro.precio, this.centro.img, this.centro.id);
          this.getCalendarEvents();
          this.centrosService.findImgs(params.id).subscribe(img => {
            this.imagenes = img;
          });
        });
      }
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.centrosService
      .reserva(
        this.centro.id,
        this.formGroup.value.nombre,
        this.formGroup.value.apellido,
        this.formGroup.value.numero,
        this.formGroup.value.correo,
        this.formGroup.value.telefono,
        this.formGroup.value.date,
        this.formGroup.value.timeDesde,
        this.formGroup.value.timeHasta).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }
  seleccionaImagen(index: number) {
    if(this.imagen === (this.imagenes.length -1 )) {
      this.imagen = 0;
    } else if ((this.imagen + index) < 0 ) {
      this.imagen = this.imagenes.length - 1;
    } else if ((this.imagen + index) > this.imagenes.length) {
      this.imagen = 0;
    } else {
      this.imagen = this.imagen + index;
    }
  }
  getCalendarEvents() {
    this.centrosService.calendarEvents(Constantes.CALENDAR_API_KEY, this.centro.url).subscribe((calendar: any) => {
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
