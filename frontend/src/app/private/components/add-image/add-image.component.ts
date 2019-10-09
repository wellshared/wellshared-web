import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  file: File;
  onClose: Subject<File> = new Subject<File>();
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  @Input() centerId: number;
  uploader: FileUploader;
  isDropOver: boolean;
  constructor() { }
 
  ngOnInit(): void {
    alert(this.centerId);
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: environment.url+'/api/center/img/'+this.centerId, autoUpload: true, headers: headers});
    this.uploader.onCompleteAll = () => alert('File uploaded');
  }
 
  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }
 
  fileClicked() {
    this.fileInput.nativeElement.click();
  }
}
