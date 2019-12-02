import {
  Component,
  OnInit
} from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { Center } from 'src/app/model/center.model';
import { Marker } from 'src/app/model/marker.model';
import { ImageConverter } from '../../../services/image-converter.service';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/model/location.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  zoom = 13;
  lat = 41.415182;
  lng = 2.180003;
  markers: Marker[] = [];
  centers: Center[] = [];
  centerSel = '0';
  previous: any;
  locations: Location[];
  constructor(private centerService: CenterService, private imageConverter: ImageConverter, private locationService: LocationService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCenters();
    window.scrollTo(0, 0);
    this.locationService.findWithAllWithCenters().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
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
        this.getMiddleLatAndLon();
      });
    }
  }

  getCenters() {
    this.centerService.find(undefined).subscribe((centers: Center[]) => {
      this.centers = centers;
      this.getMarkers();
      this.getMiddleLatAndLon();
    });
  }

  getMiddleLatAndLon() {
    let lat = 0;
    let lon = 0;
    this.centers.forEach(center => {
      lat += Number(center.lat);
      lon += Number(center.lon);
    });
    this.lat = lat / this.centers.length;
    this.lng = lon / this.centers.length;
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
