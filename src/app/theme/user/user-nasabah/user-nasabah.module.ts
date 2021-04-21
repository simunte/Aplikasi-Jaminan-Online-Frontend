import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SelectModule } from 'ng-select';

import { UserNasabahRoutingModule } from './user-nasabah-routing.module';
import { UserNasabahComponent } from './user-nasabah.component';

@NgModule({
  declarations: [UserNasabahComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    AutocompleteLibModule,
    SelectModule,
    UserNasabahRoutingModule,
  ]
})
export class UserNasabahModule { }
