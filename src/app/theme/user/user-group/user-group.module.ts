import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGroupRoutingModule } from './user-group-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { UserGroupComponent } from './user-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserGroupRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule
  ],
  declarations: [UserGroupComponent]
})
export class UserGroupModule { }
