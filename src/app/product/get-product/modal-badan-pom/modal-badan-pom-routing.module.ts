import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBadanPomPage } from './modal-badan-pom.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBadanPomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBadanPomPageRoutingModule {}
