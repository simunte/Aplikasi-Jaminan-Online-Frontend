import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlamatBankPenerbitRoutingModule } from './alamat-bank-penerbit-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { AlamatBankPenerbitComponent } from './alamat-bank-penerbit.component';

@NgModule({
  imports: [
    CommonModule,
    AlamatBankPenerbitRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    AlamatBankPenerbitComponent]
})
export class AlamatBankPenerbitModule { }
