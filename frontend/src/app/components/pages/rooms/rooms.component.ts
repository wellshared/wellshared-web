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
  Centers: Center[] = [];
  CenterSel = '0';
  previous: any;
  constructor(private CenterService: CenterService) {}

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
    if (this.CenterSel === '0') {
      this.getCenters();
    } else {
      this.CenterService.findByLoc(this.CenterSel).subscribe(Centers => {
        this.Centers = Centers;
        this.getMarkers();
      });
    }
  }

  getCenters() {
    this.CenterService.findAll().subscribe((Centers: Center[]) => {
      this.Centers = Centers;
      this.getMarkers();
    });
  }

  getMarkers() {
    this.markers = [];
    this.Centers.forEach((Center: Center) => {
      const marker: Marker = new Marker(
        Center.lat, Center.lon, false, Center.name,
          Center.adress, Center.price, Center.img, Center.id);
      this.markers[this.markers.length] = marker;
    });
  }
}
