import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Manual Data Transfer',
        status: true
      },
      children: [
        {
          path: '',
          loadChildren: './transfer-list/transfer-list.module#ManualDataTransferListModule'
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ManualDataTransferRoutingModule { }