import {
  Component,
  OnInit
} from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { Center } from 'src/app/model/center.model';
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
  centers: Center[] = [];
  centerSel = '0';
  previous: any;
  constructor(private centerService: CenterService) {}

  ngOnInit() {
    this.getCenters();
    window.scrollTo(0, 0);
  }

  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

  selectionChange() {
    if (this.centerSel === '0') {
      this.getCenters();
    } else {
      this.centerService.find(this.centerSel).subscribe((centers: Center[]) => {
        this.centers = centers;
        this.getMarkers();
      });
    }
  }

  getCenters() {
    this.centerService.find(undefined).subscribe((centers: Center[]) => {
      this.centers = centers;
      this.getMarkers();
    });
  }

  getMarkers() {
    this.markers = [];
    this.centers.forEach((center: Center) => {
      const marker: Marker = new Marker(
        center.lat, center.lon, false, center.name,
        center.adress, center.price, center.mainImage, center.id);
      this.markers[this.markers.length] = marker;
    });
  }
}
