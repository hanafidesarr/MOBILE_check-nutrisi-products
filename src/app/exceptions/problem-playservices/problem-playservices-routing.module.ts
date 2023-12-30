import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProblemPlayservicesPage } from './problem-playservices.page';

const routes: Routes = [
  {
    path: '',
    component: ProblemPlayservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemPlayservicesPageRoutingModule {}
