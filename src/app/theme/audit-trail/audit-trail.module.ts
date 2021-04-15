import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditTrailRoutingModule } from './audit-trail-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [],
    imports: [
      CommonModule,
      AuditTrailRoutingModule,
      SharedModule,
      DataTableModule,
      FormsModule,
      ReactiveFormsModule,
      NgxCurrencyModule,
      SelectModule,
    ]
  })
  export class AuditTrailModule { }