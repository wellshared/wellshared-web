import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './components/center/center.component';
import { CenterListComponent } from './components/center-list/center-list.component';
import { PrivateComponent } from './private.component';
import { RouterModule } from '@angular/router';
import { privateRouting } from './private.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddModalComponent } from './components/modals/add-modal/add-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddImageComponent } from './components/add-image/add-image.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [CenterComponent, CenterListComponent, PrivateComponent, AddModalComponent, AddImageComponent],
  imports: [
    CommonModule,
    RouterModule,
    privateRouting,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ], entryComponents: [
    AddModalComponent,
    AddImageComponent
  ], providers: [
    BsModalRef,
    BsModalService
  ]
})
export class PrivateModule { }
