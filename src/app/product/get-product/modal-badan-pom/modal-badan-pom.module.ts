import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBadanPomPageRoutingModule } from './modal-badan-pom-routing.module';

import { ModalBadanPomPage } from './modal-badan-pom.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBadanPomPageRoutingModule
  ],
  declarations: [ModalBadanPomPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalBadanPomPageModule {}
