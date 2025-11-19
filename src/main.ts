import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';


StatusBar.setOverlaysWebView({ overlay: false });
StatusBar.setStyle({ style: Style.Dark }); 

if (environment.production) {
  enableProdMode();
}

  
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
