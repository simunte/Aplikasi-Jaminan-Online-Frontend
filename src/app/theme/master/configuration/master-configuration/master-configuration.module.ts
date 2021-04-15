import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterConfigurationRoutingModule } from './master-configuration-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { MasterConfigurationComponent } from './master-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    MasterConfigurationRoutingModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    MasterConfigurationComponent]
})
export class MasterConfigurationModule { }
