import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditProductPage } from './add-edit-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditProductPageRoutingModule {}
