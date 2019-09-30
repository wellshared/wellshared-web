import {
  Component,
  OnInit
} from '@angular/core';
import { CentrosService } from 'src/app/services/centros.service';
import { Centro } from 'src/app/model/centro.model';
import { Marker } from 'src/app/model/marker.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  zoom = 12;
  lat = 41.410182;
  lng = 2.200003;
  markers: Marker[] = [];
  centros: Centro[] = [];
  centroSel = '0';
  previous: any;
  constructor(private centrosService: CentrosService) {}

  ngOnInit() {
    this.getCentros();
    window.scrollTo(0, 0);
  }

  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

  selectionChange() {
    if (this.centroSel === '0') {
      this.getCentros();
    } else {
      this.centrosService.findByLoc(this.centroSel).subscribe(centros => {
        this.centros = centros;
        this.getMarkers();
      });
    }
  }

  getCentros() {
    this.centrosService.findAll().subscribe((centros: Centro[]) => {
      this.centros = centros;
      this.getMarkers();
    });
  }

  getMarkers() {
    this.markers = [];
    this.centros.forEach((centro: Centro) => {
      const marker: Marker = new Marker(
        centro.lat, centro.lang, false, centro.nombre,
          centro.direccion, centro.precio, centro.img, centro.id);
      this.markers[this.markers.length] = marker;
    });
  }
}
