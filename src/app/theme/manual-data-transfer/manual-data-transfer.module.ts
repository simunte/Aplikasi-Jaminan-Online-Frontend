import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManualDataTransferRoutingModule } from './manual-data-transfer-routing.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManualDataTransferRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ]
})
export class ManualDataTransferModule { }