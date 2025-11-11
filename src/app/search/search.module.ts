import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SearchPageRoutingModule } from './search-routing.module';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    SearchPageRoutingModule,
    PipesModule,
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
