import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IonSearchbar } from '@ionic/angular';

import { ProductService } from '../api/product.service';

import { Platform } from '@ionic/angular';

import { App } from '@capacitor/app';
import { IonContent } from '@ionic/angular';
import { TranslationService } from '../api/translation.service';
import { AdmobService } from '../services/admob/admob.service';


@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  @ViewChild(IonContent) content: IonContent;

  // FITUR HISTORY SEARCH 
  @ViewChild('searchBar') searchBar: IonSearchbar;
  search_histories:any;
  public list_search_histories: string[] = [];
  public results_search_histories = [...this.list_search_histories];
  

  // SEARCH
  public loaded = true;
  public product_present = true;
  loaderResult = new Array(4); // Create an array with four elements

  ionicForm: FormGroup;
  result_products: any;
  list_products: any;
  next_page: any;
  page_size = 10;
  showTextMain = true;
  backButtonListener: any;

  error_result: any;

  constructor(
    public _admobService: AdmobService,
    private platform: Platform,
    public formBuilder: FormBuilder,
    private _router: Router,
    private _productService: ProductService,
    public _translation_service: TranslationService) {
    this.saveHistoryToLocStorage()
  }

  ngOnInit() {
    this.triggerBack();
    this.initForm();

    this._translation_service.init();

    this.accessAPI("", "");

  }
  ionViewDidLeave() {
    // this._admobService.hideBanner()
    // this._admobService.RemoveBanner()
    
  }

  initForm() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
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

  triggerBack(){
    this.backButtonListener = App.addListener('backButton', () => {
      if (this.searchBar) {
        this.searchBar.getInputElement().then((inputElement) => {
          inputElement.blur();
        });
        this.search_histories = false;
      }
    });
  }

  addToInput(keyword:any) {
    // add history keyword
    this.ionicForm.patchValue({
      name: keyword
    });
    this.accessAPI(keyword, this.ionicForm.value.country)
  }

  submitForm = () => {
    this.accessAPI(this.ionicForm.value.name, this.ionicForm.value.country)
  };

  accessAPI(keyword: any, country: any) {

    this.loaded = false;

    this.product_present = true;
    this.search_histories = false;
    this._productService.products({keyword: keyword, country: country, page: 1, page_size: this.page_size}).subscribe(
      (response) => {


        this.loaded = true;
        this.showTextMain = false;

        this.result_products =  response
        
        this.list_products = this.result_products.products
        this.product_present = this.list_products.length > 0
        
        
        this.next_page = 2
        
        console.log(this.result_products); // You can process the data as needed

        if (this.list_search_histories.includes(this.ionicForm.value.name)) {
          console.log('Object already exists in the history.');

          this.list_search_histories = this.list_search_histories.filter(item => item !== this.ionicForm.value.name);
          this.results_search_histories = this.results_search_histories.filter(item => item !== this.ionicForm.value.name);
          console.log(this.ionicForm.value.name != '')
          if(this.ionicForm.value.name) {
            this.list_search_histories.unshift(this.ionicForm.value.name);
            this.results_search_histories.unshift(this.ionicForm.value.name);
            localStorage.setItem('history', JSON.stringify(this.list_search_histories)); // Update local storage

          }
        } else {

          // If the object is not a duplicate, add it to the array
          // this.list_search_histories.push(this.ionicForm.value.name);
          this.list_search_histories.unshift(this.ionicForm.value.name);
          localStorage.setItem('history', JSON.stringify(this.list_search_histories)); // Update local storage
        }
      

      },
      (error) => {
        this.error_result = error.name
        this.loaded = true;
        this.product_present = false;
        this.showTextMain = false;
        console.error('Error:', error);
      }
    );
  }

  loadMore = (event: any) => {
    if(this.result_products.count > this.page_size && this.list_products.length < this.result_products.count) {
      // Simulate loading more data, or you can make another API call to fetch additional data

      this._productService.products({ keyword: this.ionicForm.value.name, country: this.ionicForm.value.country, page: this.next_page, page_size: this.page_size })
        .subscribe(
          (response) => {
            // Append the new data to the results array
            this.list_products = this.list_products.concat(response.products);
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

  openProduct = (barcodeId: any, index: number) => {
    if (index !== 0 && index % 4 === 0) {
      // Show interstitial ad and listen for ad close event
      this._admobService.showInterstitial().then(() => {
        // Ad has been closed, navigate to the next route
      });
      this._router.navigate(['/get-product', barcodeId]);
    } else {
      // If it's not the right index, navigate without waiting for ad
      this._router.navigate(['/get-product', barcodeId]);
    }
  }

  reloadPage() {
    location.reload();
  }

  saveHistoryToLocStorage() {
    const storedData = localStorage.getItem('history');
    if (storedData) {
      this.list_search_histories = JSON.parse(storedData);
    }
    this.results_search_histories = this.list_search_histories
  }
  
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results_search_histories = this.list_search_histories.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  onSearchFocus() {
    this.search_histories = true
    this.content.scrollToPoint(0, 0, 500);
  }

  deleteObjectHistory(value: string) {
    // if (index >= 0 && index < this.list_search_histories.length) {
    //   this.list_search_histories.splice(index, 1); // Remove the item from the array

    //   this.results_search_histories.splice(index, 1); // Remove the item from the array
    //   localStorage.setItem('history', JSON.stringify(this.list_search_histories)); // Update local storage
    // }  

    const index = this.results_search_histories.indexOf(value);
    if (index !== -1) {
      this.results_search_histories.splice(index, 1);
      localStorage.setItem('history', JSON.stringify(this.list_search_histories)); 
    }
  }

  ionViewWillLeave() {
    if (this.backButtonListener) {
      this.backButtonListener.remove();
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}

