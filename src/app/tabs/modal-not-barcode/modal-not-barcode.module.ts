import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNotBarcodePageRoutingModule } from './modal-not-barcode-routing.module';

import { ModalNotBarcodePage } from './modal-not-barcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNotBarcodePageRoutingModule
  ],
  declarations: [ModalNotBarcodePage]
})
export class ModalNotBarcodePageModule {}
