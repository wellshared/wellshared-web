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
import { PrivateGuard } from './private.guard';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CenterTimeFormComponent } from './components/center-time-form/center-time-form.component';

@NgModule({
  declarations: [
    CenterComponent,
    CenterListComponent,
    PrivateComponent,
    AddModalComponent,
    AddImageComponent,
    BookListComponent,
    BookComponent,
    CenterTimeFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    privateRouting,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule,
    FileUploadModule
  ], entryComponents: [
    AddModalComponent,
    AddImageComponent
  ], providers: [
    BsModalRef,
    BsModalService,
    PrivateGuard
  ]
})
export class PrivateModule { }
