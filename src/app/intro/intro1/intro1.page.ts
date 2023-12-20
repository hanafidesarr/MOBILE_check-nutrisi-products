import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';

@Component({
  selector: 'app-intro1',
  templateUrl: './intro1.page.html',
  styleUrls: ['./intro1.page.scss'],
})
export class Intro1Page implements OnInit {
  
  currentLanguage:any

  constructor(private _router: Router, public _platform: Platform, public _translation_service: TranslationService) { }

  ngOnInit() {

    this._translation_service.init();
    this.currentLanguage = this._translation_service.getCurrentLanguage();
  }

  toIntro2() {
    this._router.navigate(['/intro/intro2']);
  }

  back() {
    this._router.navigate(['/intro']);
  }

  mailto(email:any) {
    this._platform.ready().then(() => {
        window.open('mailto:'+email);
    });
  }
}
