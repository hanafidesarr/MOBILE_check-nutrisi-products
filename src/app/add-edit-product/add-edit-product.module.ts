import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditProductPageRoutingModule } from './add-edit-product-routing.module';

import { AddEditProductPage } from './add-edit-product.page';
import { ImageFieldsComponent } from '../components/image-fields/image-fields.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditProductPageRoutingModule
    
  ],
  declarations: [AddEditProductPage, ImageFieldsComponent]
})
export class AddEditProductPageModule {}
