// translation.service.ts

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private static readonly DEFAULT_LANGUAGE = 'en';
  private readonly STORAGE_KEY = 'appLanguage';

  constructor(private translate: TranslateService) {
    this.init();
  }

  init() {
    this.translate.setDefaultLang(TranslationService.DEFAULT_LANGUAGE);

    const lang = localStorage.getItem(this.STORAGE_KEY);
    if (lang) {
      this.setLanguage(lang);
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  translateKey(key: string): string {
    let translation: any;
    this.translate.get(key).subscribe((value: string) => {
      translation = value;
    });
    return translation;
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || TranslationService.DEFAULT_LANGUAGE;
  }
}
