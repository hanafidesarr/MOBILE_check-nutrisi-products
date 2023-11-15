import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBarcodePageRoutingModule } from './modal-barcode-routing.module';

import { ModalBarcodePage } from './modal-barcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBarcodePageRoutingModule
  ],
  declarations: [ModalBarcodePage]
})
export class ModalBarcodePageModule {}
