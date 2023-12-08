import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslationService } from '../api/translation.service';
import { ProductService } from '../api/product.service';

register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  loading: boolean = true;
  response: any;
  constructor(public _translation_service: TranslationService, 
    private _productService: ProductService) {
    // Initialize the translation service

    // this.getProducts()
    this._translation_service.init();
  }

  ngOnInit() {
  }
  // getProducts() {
  //   this._productService.products({keyword: "", country: "", page: 1, page_size: 10}).subscribe(
  //     (response) => {
  //       this.response = response
  //     }
  //   )
  // }
  handleImageError() {
    this.loading = false; // Hide the loading spinner
  }
 
  handleImageDidLoad() {
    this.loading = false; // Hide the loading spinner when the image is loaded
  }
}
