import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'MENU.TRANSACTIONAL',
      status: true,
    },
    children: [
      {
        path: 'jenis-produk',
        loadChildren: './jenis-produk/jenis-produk.module#JenisProdukModule'
      }, {
        path: 'jenis-jaminan',
        loadChildren: './jenis-jaminan/jenis-jaminan.module#JenisJaminanModule'
      }, {
        path: 'unit-pengguna',
        loadChildren: './unit-pengguna/unit-pengguna.module#UnitPenggunaModule'
      }, {
        path: 'alamat-bank-penerbit',
        loadChildren: './alamat-bank-penerbit/alamat-bank-penerbit.module#AlamatBankPenerbitModule'
      },{
        path: 'currency',
        loadChildren: './currency/currency.module#CurrencyModule'
      },{
        path: 'jenis-produk/:status',
        loadChildren: './jenis-produk/jenis-produk.module#JenisProdukModule'
      }, {
        path: 'jenis-jaminan/:status',
        loadChildren: './jenis-jaminan/jenis-jaminan.module#JenisJaminanModule'
      }, {
        path: 'unit-pengguna/:status',
        loadChildren: './unit-pengguna/unit-pengguna.module#UnitPenggunaModule'
      }, {
        path: 'alamat-bank-penerbit/:status',
        loadChildren: './alamat-bank-penerbit/alamat-bank-penerbit.module#AlamatBankPenerbitModule'
      },{
        path: 'currency/:status',
        loadChildren: './currency/currency.module#CurrencyModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionalRoutingModule { }
