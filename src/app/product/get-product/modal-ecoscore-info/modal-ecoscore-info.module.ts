import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEcoscoreInfoPageRoutingModule } from './modal-ecoscore-info-routing.module';

import { ModalEcoscoreInfoPage } from './modal-ecoscore-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEcoscoreInfoPageRoutingModule
  ],
  declarations: [ModalEcoscoreInfoPage]
})
export class ModalEcoscoreInfoPageModule {}
