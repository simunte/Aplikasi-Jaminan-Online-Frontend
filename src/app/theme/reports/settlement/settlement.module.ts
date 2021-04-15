import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { SettlementRoutingModule } from './settlement-routing.module';
import { SettlementComponent } from './settlement.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettlementRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
  ],
  declarations: [SettlementComponent]
})
export class SettlementModule { }
