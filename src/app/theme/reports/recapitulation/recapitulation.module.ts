import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { RecapitulationRoutingModule } from './recapitulation-routing.module';
import { RecapitulationComponent } from './recapitulation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RecapitulationRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
  ],
  declarations: [RecapitulationComponent]
})
export class RecapitulationModule { }
