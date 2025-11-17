import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalAddProductComponent } from './modal-add-product.component';

@NgModule({
  declarations: [ModalAddProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ModalAddProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalAddProductModule {}
