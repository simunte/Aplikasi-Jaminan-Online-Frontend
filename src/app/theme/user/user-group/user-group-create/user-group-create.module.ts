import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGroupCreateRoutingModule } from './user-group-create-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { UserGroupCreateComponent } from './user-group-create.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserGroupCreateRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule
  ],
  declarations: [UserGroupCreateComponent]
})
export class UserGroupCreateModule { }
