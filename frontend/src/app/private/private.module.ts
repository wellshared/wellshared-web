import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './components/center/center.component';
import { CenterListComponent } from './components/center-list/center-list.component';
import { PrivateComponent } from './private.component';
import { RouterModule } from '@angular/router';
import { privateRouting } from './private.routes';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CenterComponent, CenterListComponent, PrivateComponent],
  imports: [
    CommonModule,
    RouterModule,
    privateRouting,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
