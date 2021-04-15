import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { SettlementDetailComponent } from './settlement-detail.component';
import { SettlementDetailRoutingModule } from './settlement-detail-routing.module';
import { ReportModule } from '../../reports.module';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettlementDetailRoutingModule,
    SharedModule,
    ReportModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    SettlementDetailComponent]
})
export class SettlementDetailModule { }
