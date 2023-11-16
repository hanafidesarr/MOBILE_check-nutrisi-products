import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNovascoreInfoPageRoutingModule } from './modal-novascore-info-routing.module';

import { ModalNovascoreInfoPage } from './modal-novascore-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNovascoreInfoPageRoutingModule
  ],
  declarations: [ModalNovascoreInfoPage]
})
export class ModalNovascoreInfoPageModule {}
