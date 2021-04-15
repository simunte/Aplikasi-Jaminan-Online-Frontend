import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'MENU.MASTER_DATA',
      status: true
    },
    children: [
      {
        path: 'transactional',
        loadChildren: './transactional/transactional.module#TransactionalModule'
      },
      {
        path: 'configuration',
        loadChildren: './configuration/configuration.module#ConfigurationModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
