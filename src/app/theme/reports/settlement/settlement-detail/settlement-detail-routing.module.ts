import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SettlementDetailComponent } from './settlement-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementDetailComponent,
    data: {
      title: 'Settlement Detail',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettlementDetailRoutingModule { }
