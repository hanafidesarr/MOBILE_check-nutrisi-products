import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNutriscoreInfoPage } from './modal-nutriscore-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNutriscoreInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNutriscoreInfoPageRoutingModule {}
