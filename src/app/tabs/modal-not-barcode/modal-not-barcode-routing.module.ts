import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNotBarcodePage } from './modal-not-barcode.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNotBarcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNotBarcodePageRoutingModule {}
