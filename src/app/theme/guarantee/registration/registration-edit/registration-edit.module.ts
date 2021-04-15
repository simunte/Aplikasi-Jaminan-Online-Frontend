import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationEditComponent} from './registration-edit.component';
import {RegistrationEditRoutingModule} from './registration-edit-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {QuillEditorModule} from 'ngx-quill-editor/index';
import {DataTableModule} from 'angular2-datatable';
import {HttpClientModule} from '@angular/common/http';
import { NgxCurrencyModule } from "ngx-currency";
import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationEditRoutingModule,
    SharedModule,
    QuillEditorModule,
    HttpClientModule,
    DataTableModule,
    SelectModule,
    NgxCurrencyModule
  ],
  declarations: [RegistrationEditComponent]
})
export class RegistrationEditModule { }
