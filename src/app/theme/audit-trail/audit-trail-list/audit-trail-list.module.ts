import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditTrailComponent } from './audit-trail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditTrailListRoutingModule } from './audit-trail-list-routing.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { ToastyModule } from 'ng2-toasty';
import { SelectModule } from 'ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuditTrailComponent],
  imports: [
    CommonModule,
    AuditTrailListRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    SelectModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot()
  ]
})
export class AuditTrailListModule { }