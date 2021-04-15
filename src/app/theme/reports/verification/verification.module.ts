import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { VerificationComponent } from './verification.component';
import { VerificationRoutingModule } from './verification-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    VerificationRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
  ],
  declarations: [VerificationComponent]
})
export class VerificationModule { }
