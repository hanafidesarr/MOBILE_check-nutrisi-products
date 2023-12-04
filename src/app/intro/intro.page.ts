import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../api/translation.service';
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
  constructor(public _router: Router, public translationService: TranslationService) {

    this.translationService.init();
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  ngOnInit() {
  }

  changeSelectLang(e:any) {

    this.translationService.setLanguage(this.currentLanguage);
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
  
}
