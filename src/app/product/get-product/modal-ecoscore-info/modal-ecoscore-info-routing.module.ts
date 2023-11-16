import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEcoscoreInfoPage } from './modal-ecoscore-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEcoscoreInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEcoscoreInfoPageRoutingModule {}
