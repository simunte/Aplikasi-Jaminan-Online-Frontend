import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { VerificationDetailRoutingModule } from './verification-detail-routing.module';
import { VerificationDetailComponent } from './verification-detail.component';
import { ReportModule } from '../../reports.module';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VerificationDetailRoutingModule,
    SharedModule,
    ReportModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    VerificationDetailComponent]
})
export class VerificationDetailModule { }
