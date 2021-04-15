import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationCreateComponent } from './registration-create.component';
import {RegistrationCreateRoutingModule} from './registration-create-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared.module';
import {QuillEditorModule} from 'ngx-quill-editor/index';
import {DataTableModule} from 'angular2-datatable';
import {HttpClientModule} from '@angular/common/http';
import { NgxCurrencyModule } from "ngx-currency";
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [RegistrationCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationCreateRoutingModule,
    SharedModule,
    QuillEditorModule,
    HttpClientModule,
    DataTableModule,
    SelectModule,
    NgxCurrencyModule
  ]
})
export class RegistrationCreateModule { }
