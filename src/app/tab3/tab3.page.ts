import { Component } from '@angular/core';

import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  loading: boolean = true;

  constructor() {}


  handleImageError() {
    this.loading = false; // Hide the loading spinner
  }

 
  handleImageDidLoad() {
    this.loading = false; // Hide the loading spinner when the image is loaded
  }
}
