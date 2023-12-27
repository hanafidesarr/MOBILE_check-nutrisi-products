import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';

@Component({
  selector: 'app-intro2',
  templateUrl: './intro2.page.html',
  styleUrls: ['./intro2.page.scss'],
})
export class Intro2Page implements OnInit {
  
  currentLanguage:any

  constructor(private _router: Router, public _platform: Platform, public _translation_service: TranslationService) { }

  ngOnInit() {

    this._translation_service.init();
    this.currentLanguage = this._translation_service.getCurrentLanguage();
  }

  toIntro3() {

    // const storedValue = localStorage.getItem('introViewed');
    // // Check if the intro has been viewed from localStorage
    // this.hasIntroBeenViewed = storedValue !== null && JSON.parse(storedValue);

    // // If the intro hasn't been viewed, mark it as viewed
    // if (!this.hasIntroBeenViewed) {
    //   localStorage.setItem('introViewed', 'true');
    // }
    

    this._router.navigate(['/intro/intro3']);

  }

  back() {
    this._router.navigate(['/intro/intro1']);
  }

  mailto(email:any) {
    this._platform.ready().then(() => {
        window.open('mailto:'+email);
    });
  }
}
