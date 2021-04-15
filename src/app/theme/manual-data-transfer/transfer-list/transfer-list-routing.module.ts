import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferListComponent } from './transfer-list.component';

const routes: Routes = [
    {
      path: '',
      component: TransferListComponent,
      data: {
        title: 'Manual Data Transfer List',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ManualDataTransferListRoutingModule { }