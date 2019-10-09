import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CenterService } from 'src/app/services/center.service';
import { Center } from 'src/app/model/center.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from 'src/app/model/location.model';
import { LocationService } from 'src/app/services/location.service';
import { Image } from '../../../model/image.model';
import { Service } from 'src/app/model/service.model';
import { AddModalComponent } from '../modals/add-modal/add-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  formGroup: FormGroup;
  locations: Location[] = [];
  center: Center = new Center();
  services: Service[] = [];
  constructor(
    private activatedRoute: ActivatedRoute, private centerService: CenterService,
    private locationService: LocationService, private router: Router, 
    private modalService: BsModalService, private serviceService: ServiceService
    ) {
      this.createEmptyForGroup();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.findCenter(Number(params.id));        
      }
    });
    this.findLocations();
    this.findServices();
  }

  findServices() {
    this.serviceService.findAll().subscribe((services: Service[]) => {
      this.services = services;
    });
  }

  findCenter(id: number) {
    this.centerService.findById(id).subscribe((center: Center) => {
      this.center = center;
      this.updateFormGroup();
    });
  }

  findLocations() {
    this.locationService.findAll().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  createEmptyForGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      description1: new FormControl(null, Validators.required),
      description2: new FormControl(null),
      price: new FormControl(null, Validators.required),
      lat: new FormControl(null, Validators.required),
      lon: new FormControl(null, Validators.required),
      individual: new FormControl(0, Validators.required),
      activities: new FormControl(0, Validators.required),
      url: new FormControl(null, Validators.required),
    });
  }

  updateFormGroup() {
    this.formGroup.controls.name.setValue(this.center.name);
    this.formGroup.controls.adress.setValue(this.center.adress);
    this.formGroup.controls.location.setValue(this.center.location.id);
    this.formGroup.controls.description1.setValue(this.center.description);
    this.formGroup.controls.description2.setValue(this.center.description2);
    this.formGroup.controls.price.setValue(this.center.price);
    this.formGroup.controls.lat.setValue(this.center.lat);
    this.formGroup.controls.lon.setValue(this.center.lon);
    this.formGroup.controls.individual.setValue((this.center.individual) ? this.center.individual : 0);
    this.formGroup.controls.activities.setValue((this.center.activites) ? this.center.activites : 0);
    this.formGroup.controls.url.setValue(this.center.url);
  }

  updateCenterModel() {
    this.center.name = this.formGroup.controls.name.value;
    this.center.adress = this.formGroup.controls.adress.value;
    this.center.location = this.locations.find((location: Location) => location.id === Number(this.formGroup.controls.location.value));
    this.center.description = this.formGroup.controls.description1.value;
    this.center.description2 = this.formGroup.controls.description2.value;
    this.center.price = this.formGroup.controls.price.value;
    this.center.lat = this.formGroup.controls.lat.value;
    this.center.lon = this.formGroup.controls.lon.value;
    this.center.individual = this.formGroup.controls.individual.value;
    this.center.activites = this.formGroup.controls.activities.value;
    this.center.url = this.formGroup.controls.url.value;
  }

  removeImage(id: number) {
    this.center.images = this.center.images.filter((image: Image) => image.id !== id);
  }

  removeService(id: number) {
    this.center.services = this.center.services.filter((service: Service) => service.id !== id);
  }

  addService() {
    const modalRef = this.modalService.show(AddModalComponent, {
      initialState: {
        list: this.services
      }
    });
    modalRef.content.onClose.subscribe((id: number) => {
      this.center.services.push(this.services.find((service: Service) => service.id === id));
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.updateCenterModel();
      this.centerService.save(this.center).subscribe(() => {
        this.router.navigate(['/admin/centers']);
      });
    }
  }

}
