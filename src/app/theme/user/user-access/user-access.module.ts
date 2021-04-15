import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAccessRoutingModule } from './user-access-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { UserAccessComponent } from './user-access.component';
import { SelectModule } from 'ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserAccessRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    SelectModule,
    AutocompleteLibModule
  ],
  declarations: [UserAccessComponent]
})
export class UserAccessModule { }
