import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryRoutingModule } from './beneficiary-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { BeneficiaryComponent } from './beneficiary.component';

@NgModule({
  imports: [
    CommonModule,
    BeneficiaryRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    BeneficiaryComponent]
})
export class BeneficiaryModule { }
