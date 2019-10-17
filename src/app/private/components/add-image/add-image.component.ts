import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Image } from 'src/app/model/image.model';

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
  @Output() imageLoaded: EventEmitter<void> = new EventEmitter();
  uploader: FileUploader;
  isDropOver: boolean;
  constructor() { }
 
  ngOnInit(): void {
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: environment.url + '/api/center/img/' + this.centerId, autoUpload: true, headers});
    this.uploader.onCompleteAll = () => this.imageLoaded.emit();
  }
 
  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }
 
  fileClicked() {
    this.fileInput.nativeElement.click();
  }
}
