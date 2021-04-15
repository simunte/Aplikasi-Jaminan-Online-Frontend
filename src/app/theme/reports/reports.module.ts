import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuaranteeDetailComponent } from './guarantee-detail/guarantee-detail.component';

@NgModule({
  declarations: [
    GuaranteeDetailComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ],
  exports: [
    GuaranteeDetailComponent
  ]
})
export class ReportModule { }
