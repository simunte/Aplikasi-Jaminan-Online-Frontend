import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JenisJaminanRoutingModule } from './jenis-jaminan-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { JenisJaminanComponent } from './jenis-jaminan.component';

@NgModule({
  imports: [
    CommonModule,
    JenisJaminanRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    JenisJaminanComponent]
})
export class JenisJaminanModule { }
