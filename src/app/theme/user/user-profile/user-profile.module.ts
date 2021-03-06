import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {QuillEditorModule} from 'ngx-quill-editor/index';
import {DataTableModule} from 'angular2-datatable';
import {HttpClientModule} from '@angular/common/http';
import { UserNasabahComponent } from '../user-nasabah/user-nasabah.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutingModule,
    SharedModule,
    QuillEditorModule,
    HttpClientModule,
    DataTableModule,
  ],
  declarations: [UserProfileComponent, 
    UserNasabahComponent]
})
export class UserProfileModule { }
