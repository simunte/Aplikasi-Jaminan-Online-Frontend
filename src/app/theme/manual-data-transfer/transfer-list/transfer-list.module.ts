import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferListComponent } from './transfer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManualDataTransferListRoutingModule } from './transfer-list-routing.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    TransferListComponent],
  imports: [
    CommonModule,
    ManualDataTransferListRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ]
})
export class ManualDataTransferListModule { }