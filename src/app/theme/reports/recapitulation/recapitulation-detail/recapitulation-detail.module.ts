import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecapitulationDetailRoutingModule } from './recapitulation-detail-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { RecapitulationDetailComponent } from './recapitulation-detail.component';
import { ReportModule } from '../../reports.module';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecapitulationDetailRoutingModule,
    SharedModule,
    DataTableModule,
    ReportModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    RecapitulationDetailComponent]
})
export class RecapitulationDetailModule { }
