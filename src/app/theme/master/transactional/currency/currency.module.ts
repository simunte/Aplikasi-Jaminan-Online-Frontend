import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyRoutingModule } from './currency-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { CurrencyComponent } from './currency.component';

@NgModule({
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    CurrencyComponent]
})
export class CurrencyModule { }
