import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from './../api/product.service';
import { LoadingService } from './../api/loading.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  show_debounce:any = false;

  ionicForm: FormGroup;
  result: any;
  products: any;
  next_page: any;
  page_size = 5;
  showTextMain = true;
  
  public loaded = true;
  public product_present = true;

  itemsArray = new Array(4); // Create an array with four elements
  
  public data = [
    'Grade A extra Large eggs',
    'avena',
    'Susu ultra',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];
  public results = [...this.data];

  constructor(public formBuilder: FormBuilder,  private _router: Router, private _productService: ProductService, public _loadingService: LoadingService) {}
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

  addToInput(data:any) {
    this.show_debounce = false;
    this.loaded = false;
    this.product_present = true;
    this.ionicForm.patchValue({
      name: data
    });
    this.show_debounce = false
    this.accessAPI()
  }

  submitForm = () => {
    this.show_debounce = false;
    this.loaded = false;
    this.product_present = true;
    this.accessAPI()
  };

  accessAPI() {
    this._productService.products({brands_tags: this.ionicForm.value, page: 1, page_size: this.page_size}).subscribe(
      (response) => {

        this.loaded = true;
        this.showTextMain = false;

        this.result =  response
        
        this.products = this.result.products
        this.product_present = this.products.length > 0
        
        // this._loadingService.hideLoader();
        this.next_page = 2
        
        console.log(this.result); // You can process the data as needed

      },
      (error) => {
        this.loaded = true;
        this.product_present = false;
        this.showTextMain = false;
        console.error('Error:', error);
      }
    );
  }

  loadMore = (event: any) => {
    if(this.result.count > this.page_size && this.products.length < this.result.count) {
      // Simulate loading more data, or you can make another API call to fetch additional data

      this._productService.products({ brands_tags: this.ionicForm.value, page: this.next_page, page_size: this.page_size })
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

  openProduct = (barcodeId: any) => {
    this._router.navigate(['/get-product', barcodeId]);
  }

  reloadPage() {

    location.reload();
  }



  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);

  }
  onSearchFocus() {
    this.show_debounce = true
  }
  onSearchBlur() {
    // console.log(this.ionicForm.value.name)
    // if (this.ionicForm.value.name == '') {

    //   this.show_debounce = true
    // }
    // this.show_debounce = false

    // Delay the execution of hiding the search results
    setTimeout(() => {
      if (this.ionicForm.value.name == '') {
        this.show_debounce = false;
      }
    }, 200); // You can adjust the delay time as needed
  }



}
