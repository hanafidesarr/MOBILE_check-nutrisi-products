import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNutriscoreInfoPageRoutingModule } from './modal-nutriscore-info-routing.module';

import { ModalNutriscoreInfoPage } from './modal-nutriscore-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNutriscoreInfoPageRoutingModule
  ],
  declarations: [ModalNutriscoreInfoPage]
})
export class ModalNutriscoreInfoPageModule {}
