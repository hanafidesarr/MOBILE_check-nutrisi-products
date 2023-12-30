import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';

@Component({
  selector: 'app-intro3',
  templateUrl: './intro3.page.html',
  styleUrls: ['./intro3.page.scss'],
})
export class Intro3Page implements OnInit {
  
  currentLanguage:any;

  constructor(private _router: Router, public _platform: Platform, public _translation_service: TranslationService) { }

  ngOnInit() {

    this._translation_service.init();
    this.currentLanguage = this._translation_service.getCurrentLanguage();
  }

  toHome() {

    this._router.navigate(['/tabs']);

  }

  back() {
    this._router.navigate(['/intro/intro2']);
  }

  mailto(email:any) {
    this._platform.ready().then(() => {
        window.open('mailto:'+email);
    });
  }
}
