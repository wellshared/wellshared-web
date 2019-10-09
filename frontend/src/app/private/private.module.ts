import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './components/center/center.component';
import { CenterListComponent } from './components/center-list/center-list.component';
import { PrivateComponent } from './private.component';
import { RouterModule } from '@angular/router';
import { privateRouting } from './private.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddModalComponent } from './components/modals/add-modal/add-modal.component';
import { BsModalRef, BsModalService, ModalBackdropComponent, ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [CenterComponent, CenterListComponent, PrivateComponent, AddModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    privateRouting,
    ReactiveFormsModule,
    FormsModule
  ], entryComponents: [
    AddModalComponent
  ], providers: [
    BsModalRef,
    BsModalService
  ]
})
export class PrivateModule { }
