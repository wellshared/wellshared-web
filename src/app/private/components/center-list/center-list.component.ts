import { Component, OnInit } from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { Center } from 'src/app/model/center.model';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.css']
})
export class CenterListComponent implements OnInit {
  centers: Center[] = [];
  constructor(private centerService: CenterService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.centerService.find(null).subscribe((centers: Center[]) => {
      this.centers = centers;
    });
  }
  deleteCenter(id: number) {
    this.centerService.deleteCenter(id).subscribe(() => {
      this.findAll();
    });
  }

}
