import { JenisJaminanComponent } from './jenis-jaminan.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: JenisJaminanComponent,
    data: {
      title: 'MENU.JENIS_JAMINAN',
      status: true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JenisJaminanRoutingModule { }
