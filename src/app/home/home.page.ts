import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslationService } from '../api/translation.service';

register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  loading: boolean = true;
  constructor(public translationService: TranslationService) {
    // Initialize the translation service
    this.translationService.init();
  }

  handleImageError() {
    this.loading = false; // Hide the loading spinner
  }
 
  handleImageDidLoad() {
    this.loading = false; // Hide the loading spinner when the image is loaded
  }
}
