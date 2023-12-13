import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../api/translation.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  hasIntroBeenViewed: boolean;
  
  currentLanguage: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  constructor(public _router: Router, public _translation_service: TranslationService, public _platform: Platform) {

    this._translation_service.init();
    this.currentLanguage = this._translation_service.getCurrentLanguage();
  }

  ngOnInit() {
  }

  changeSelectLang(e:any) {
    this._translation_service.setLanguage(this.currentLanguage);
  }

  navigateToHome() {

    const storedValue = localStorage.getItem('introViewed');
    // Check if the intro has been viewed from localStorage
    this.hasIntroBeenViewed = storedValue !== null && JSON.parse(storedValue);

    // If the intro hasn't been viewed, mark it as viewed
    if (!this.hasIntroBeenViewed) {
      localStorage.setItem('introViewed', 'true');
    }
    

    this._router.navigate(['/tabs']);

  }
  
  mailto(email:any) {
    this._platform.ready().then(() => {
        window.open('mailto:'+email);
    });
  }
}
