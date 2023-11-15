import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBarcodePage } from './modal-barcode.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBarcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBarcodePageRoutingModule {}
