import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UnderConstructionComponent } from './under-construction.component';
import { UnderConstructionRoutingModule } from './under-construction-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: UnderConstructionComponent,
    data: {
      title: 'Bank Guarantee',
      icon: 'ti-users',
      caption: 'loursem it to no crm to dshil aksl ek se.',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    UnderConstructionRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UnderConstructionComponent]
})
export class UnderConstructionModule { }
