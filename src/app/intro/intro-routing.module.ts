import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroPage } from './intro.page';

const routes: Routes = [
  {
    path: '',
    component: IntroPage
  },
  {
    path: 'intro1',
    loadChildren: () => import('./intro1/intro1.module').then( m => m.Intro1PageModule)
  },
  {
    path: 'intro2',
    loadChildren: () => import('./intro2/intro2.module').then( m => m.Intro2PageModule)
  },
  {
    path: 'intro3',
    loadChildren: () => import('./intro3/intro3.module').then( m => m.Intro3PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroPageRoutingModule {}
