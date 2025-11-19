import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./bookmark/bookmark.module').then( m => m.BookmarkPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'get-product/:barcodeId',
    loadChildren: () => import('./product/get-product/get-product.module').then(m => m.GetProductPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'problem-playservices',
    loadChildren: () => import('./exceptions/problem-playservices/problem-playservices.module').then( m => m.ProblemPlayservicesPageModule)
  },
  {
    path: 'add-edit-product',
    loadChildren: () =>
      import('./add-edit-product/add-edit-product.module').then(
        m => m.AddEditProductPageModule
      ),
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
