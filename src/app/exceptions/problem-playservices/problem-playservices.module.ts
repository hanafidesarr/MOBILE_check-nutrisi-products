import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProblemPlayservicesPageRoutingModule } from './problem-playservices-routing.module';

import { ProblemPlayservicesPage } from './problem-playservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProblemPlayservicesPageRoutingModule
  ],
  declarations: [ProblemPlayservicesPage]
})
export class ProblemPlayservicesPageModule {}
