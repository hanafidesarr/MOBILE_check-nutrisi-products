import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from './../api/product.service';
import { LoadingService } from './../api/loading.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ionicForm: FormGroup;
  result: any;
  products: any;
  next_page: any;
  constructor(public formBuilder: FormBuilder, private _productService: ProductService, public _loadingService: LoadingService) {}
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      country: ['indonesia', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm = () => {
    this._loadingService.showLoader();
    this._productService.fetchData({brands_tags: this.ionicForm.value, page: 1}).subscribe(
      (response) => {
        this.result =  response
        this.products = this.result.products
        this._loadingService.hideLoader();
        this.next_page = 2
        console.log(this.result); // You can process the data as needed
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  };

  loadMore = (event: any) => {
    if(this.result.count > 24 && this.products.length < this.result.count) {
      // Simulate loading more data, or you can make another API call to fetch additional data

      this._productService.fetchData({ brands_tags: this.ionicForm.value, page: this.next_page })
        .subscribe(
          (response) => {
            // Append the new data to the results array
            this.products = this.products.concat(response.products);
            this.next_page = this.next_page + 1
            event.target.complete();
          },
          (error) => {
            console.error('Error while loading more data:', error);
            event.target.complete();
          }
        );
    } else {

      event.target.complete();
    }
  }

}
