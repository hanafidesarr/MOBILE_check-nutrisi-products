import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutritionFactsComponent } from './nutrition-facts.component';
import { NutritionListComponentModule } from './../nutrition-list/nutrition-list.module'


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, NutritionListComponentModule],
  declarations: [NutritionFactsComponent],
  exports: [NutritionFactsComponent]
})
export class NutritionFactsComponentModule {}
