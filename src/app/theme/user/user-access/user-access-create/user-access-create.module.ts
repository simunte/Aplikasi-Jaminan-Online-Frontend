import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAccessCreateRoutingModule } from './user-access-create-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { UserAccessCreateComponent } from './user-access-create.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SelectModule } from 'ng-select';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserAccessCreateRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    AutocompleteLibModule,
    SelectModule,
  ],
  declarations: [UserAccessCreateComponent]
})
export class UserAccessCreateModule { }
