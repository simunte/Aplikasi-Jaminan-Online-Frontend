import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JenisProdukRoutingModule } from './jenis-produk-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { JenisProdukComponent } from './jenis-produk.component';

@NgModule({
  imports: [
    CommonModule,
    JenisProdukRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    JenisProdukComponent]
})
export class JenisProdukModule { }
