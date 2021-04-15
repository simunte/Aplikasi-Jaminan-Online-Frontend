import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecapitulationComponent } from './recapitulation.component';

const routes: Routes = [
  {
    path: '',
    component: RecapitulationComponent,
    data: {
      title: 'Recapitulation',
      status: true
    }
  }, {
    path: '',
    data: {
      title: 'Recapitulation',
      status: true
    }, children: [
      {
        path: 'recapitulation-detail',
        loadChildren: './recapitulation-detail/recapitulation-detail.module#RecapitulationDetailModule',

      },
      {
        path: 'recapitulation-detail/:id_jaminan',
        loadChildren: './recapitulation-detail/recapitulation-detail.module#RecapitulationDetailModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecapitulationRoutingModule { }
