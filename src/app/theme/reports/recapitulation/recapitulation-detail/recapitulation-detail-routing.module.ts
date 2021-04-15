import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecapitulationDetailComponent} from './recapitulation-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecapitulationDetailComponent,
    data: {
      title: 'Recapitulation Detail',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecapitulationDetailRoutingModule { }
