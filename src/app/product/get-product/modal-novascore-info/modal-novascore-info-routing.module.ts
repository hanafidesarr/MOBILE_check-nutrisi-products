import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNovascoreInfoPage } from './modal-novascore-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNovascoreInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNovascoreInfoPageRoutingModule {}
