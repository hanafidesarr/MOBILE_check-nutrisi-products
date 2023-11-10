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
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetProductPageRoutingModule {}
