import { JenisProdukComponent } from './jenis-produk.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: JenisProdukComponent,
    data: {
      title: 'MENU.JENIS_PRODUK',
      status: true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JenisProdukRoutingModule { }
