import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettlementComponent } from './settlement.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementComponent,
    data: {
      title: 'Settlement',
      status: true
    }
  }, {
    path: '',
    data: {
      title: 'Settlement',
      status: true
    }, children: [
      {
        path: 'settlement-detail',
        loadChildren: './settlement-detail/settlement-detail.module#SettlementDetailModule',

      },
      {
        path: 'settlement-detail/:id_jaminan',
        loadChildren: './settlement-detail/settlement-detail.module#SettlementDetailModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettlementRoutingModule { }
