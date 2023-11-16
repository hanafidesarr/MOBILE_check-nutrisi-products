import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetProductPage } from './get-product.page';

const routes: Routes = [
  {
    path: '',
    component: GetProductPage
  },

  {
    path: 'get-product',
    component: GetProductPage
  },
  {
    path: 'modal-image',
    loadChildren: () => import('./modal-image/modal-image.module').then( m => m.ModalImagePageModule)
  },
  {
    path: 'modal-nutriscore-info',
    loadChildren: () => import('./modal-nutriscore-info/modal-nutriscore-info.module').then( m => m.ModalNutriscoreInfoPageModule)
  },
  {
    path: 'modal-ecoscore-info',
    loadChildren: () => import('./modal-ecoscore-info/modal-ecoscore-info.module').then( m => m.ModalEcoscoreInfoPageModule)
  },
  {
    path: 'modal-novascore-info',
    loadChildren: () => import('./modal-novascore-info/modal-novascore-info.module').then( m => m.ModalNovascoreInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetProductPageRoutingModule {}
