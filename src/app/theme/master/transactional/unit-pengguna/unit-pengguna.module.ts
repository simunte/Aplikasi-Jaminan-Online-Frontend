import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitPenggunaRoutingModule } from './unit-pengguna-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { UnitPenggunaComponent } from './unit-pengguna.component';

@NgModule({
  imports: [
    CommonModule,
    UnitPenggunaRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    UnitPenggunaComponent]
})
export class UnitPenggunaModule { }
