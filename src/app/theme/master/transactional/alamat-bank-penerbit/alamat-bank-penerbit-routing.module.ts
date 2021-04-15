import { AlamatBankPenerbitComponent } from './alamat-bank-penerbit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AlamatBankPenerbitComponent,
    data: {
      title: 'MENU.ALAMAT_BANK_PENERBIT',
      status: true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlamatBankPenerbitRoutingModule { }
