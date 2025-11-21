import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookmarkPageRoutingModule } from './bookmark-routing.module';

import { BookmarkPage } from './bookmark.page';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookmarkPageRoutingModule,
    PipesModule
  ],
  declarations: [BookmarkPage]
})
export class BookmarkPageModule {}
