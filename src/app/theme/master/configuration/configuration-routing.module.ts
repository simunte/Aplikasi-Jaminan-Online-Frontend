import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'MENU.CONFIGURATION',
      status: true,
    },
    children: [
      {
        path: 'master-configuration',
        loadChildren: './master-configuration/master-configuration.module#MasterConfigurationModule'
      },
      {
        path: 'beneficiary',
        loadChildren: './beneficiary/beneficiary.module#BeneficiaryModule'
      },
      {
        path: 'master-configuration/:status',
        loadChildren: './master-configuration/master-configuration.module#MasterConfigurationModule'
      },
      {
        path: 'beneficiary/:status',
        loadChildren: './beneficiary/beneficiary.module#BeneficiaryModule'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
