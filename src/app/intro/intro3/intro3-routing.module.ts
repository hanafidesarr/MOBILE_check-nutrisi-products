import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Intro3Page } from './intro3.page';

const routes: Routes = [
  {
    path: '',
    component: Intro3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Intro3PageRoutingModule {}
