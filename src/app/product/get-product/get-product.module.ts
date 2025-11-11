import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetProductPageRoutingModule } from './get-product-routing.module';

import { GetProductPage } from './get-product.page';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { NutritionFactsComponentModule } from './../../component/nutrition-facts/nutrition-facts.module';

import { PipesModule } from './../../pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetProductPageRoutingModule,
    NutritionFactsComponentModule,
    PipesModule,
  ],
  declarations: [GetProductPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetProductPageModule {}
