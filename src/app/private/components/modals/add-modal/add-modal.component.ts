import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @Input() list: any[];
  id: number;
  public onClose: Subject<number> = new Subject();
  constructor(private bsmodalRef: BsModalRef) { }

  ngOnInit() {
  }

  submit() {
    this.bsmodalRef.hide();
    this.onClose.next(Number(this.id));
  }
}
