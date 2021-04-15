import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report',
      status: true
    },
    children: [
      {
        path: 'recapitulation',
        loadChildren: './recapitulation/recapitulation.module#RecapitulationModule'
      }, 
      {
        path: 'recapitulation/:bg_status',
        loadChildren: './recapitulation/recapitulation.module#RecapitulationModule'
      },
      {
        path: 'settlement',
        loadChildren: './settlement/settlement.module#SettlementModule'
      },
      {
        path: 'settlement/:bg_status',
        loadChildren: './settlement/settlement.module#SettlementModule'
      }, {
        path: 'verification',
        loadChildren: './verification/verification.module#VerificationModule'
      },
      {
        path: 'verification/:bg_status',
        loadChildren: './verification/verification.module#VerificationModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
