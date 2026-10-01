import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IonSearchbar, IonContent } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { App } from '@capacitor/app';

import { ProductService } from '../api/product.service';
import { TranslationService } from '../api/translation.service';
import { AdmobService } from '../services/admob/admob.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  @ViewChild(IonContent) content!: IonContent;
  @ViewChild('searchBar') searchBar!: IonSearchbar;

  // ============================================================
  // SEARCH HISTORY
  // ============================================================

  search_histories = false;

  public list_search_histories: string[] = [];
  public results_search_histories: string[] = [];

  // ============================================================
  // SEARCH / PRODUCTS
  // ============================================================

  public loaded = false;
  public product_present = false;

  loaderResult = new Array(4);

  ionicForm!: FormGroup;

  result_products: any = null;
  list_products: any[] = [];

  next_page = 2;
  page_size = 3;

  showTextMain = false;

  error_result: any = null;

  backButtonListener: any;

  private loadingMore = false;

  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    public _admobService: AdmobService,
    private platform: Platform,
    public formBuilder: FormBuilder,
    private _router: Router,
    private _productService: ProductService,
    public _translation_service: TranslationService
  ) {
    this.saveHistoryToLocStorage();
  }

  // ============================================================
  // LIFECYCLE
  // ============================================================

  ngOnInit() {
    this.triggerBack();

    this.initForm();

    this._translation_service.init();

    // Load initial products immediately.
    this.accessAPI('', '');
  }

  ionViewDidLeave() {
    // Keep this empty for now.
    // AdMob banner can be handled here if required.
  }

  ionViewWillLeave() {
    if (this.backButtonListener) {
      this.backButtonListener.remove();
      this.backButtonListener = null;
    }
  }

  // ============================================================
  // FORM
  // ============================================================

  initForm() {
    this.ionicForm = this.formBuilder.group({
      /*
       * Search fields are optional because the initial page
       * searches with empty keyword and country.
       */
      name: [''],
      country: [''],

      /*
       * Kept from the original form structure.
       */
      email: [
        '',
        [
          Validators.pattern(
            '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'
          )
        ]
      ],

      mobile: [
        '',
        [
          Validators.pattern('^[0-9]+$')
        ]
      ]
    });
  }

  // ============================================================
  // ANDROID BACK BUTTON
  // ============================================================

  triggerBack() {
    this.backButtonListener = App.addListener('backButton', () => {

      if (this.searchBar) {
        this.searchBar
          .getInputElement()
          .then((inputElement) => {
            inputElement.blur();
          });
      }

      this.search_histories = false;
    });
  }

  // ============================================================
  // SEARCH HISTORY
  // ============================================================

  saveHistoryToLocStorage() {
    try {
      const storedData = localStorage.getItem('history');

      if (!storedData) {
        this.list_search_histories = [];
        this.results_search_histories = [];
        return;
      }

      const parsedData = JSON.parse(storedData);

      if (Array.isArray(parsedData)) {
        this.list_search_histories = [
          ...new Set(
            parsedData.filter(
              (item: any) =>
                typeof item === 'string' &&
                item.trim().length > 0
            )
          )
        ];
      } else {
        this.list_search_histories = [];
      }

      this.results_search_histories = [
        ...this.list_search_histories
      ];

    } catch (error) {
      console.error(
        'Error loading search history:',
        error
      );

      this.list_search_histories = [];
      this.results_search_histories = [];
    }
  }

  saveSearchHistory(keyword: string) {

    const value = (keyword || '').trim();

    // Do not save empty search.
    if (!value) {
      return;
    }

    // Remove existing value first.
    this.list_search_histories =
      this.list_search_histories.filter(
        item => item !== value
      );

    // Add latest search to the beginning.
    this.list_search_histories.unshift(value);

    // Keep maximum 20 history items.
    this.list_search_histories =
      this.list_search_histories.slice(0, 20);

    this.results_search_histories = [
      ...this.list_search_histories
    ];

    localStorage.setItem(
      'history',
      JSON.stringify(this.list_search_histories)
    );
  }

  addToInput(keyword: string) {

    if (!keyword) {
      return;
    }

    this.ionicForm.patchValue({
      name: keyword
    });

    this.search_histories = false;

    this.accessAPI(
      keyword,
      this.ionicForm.value.country || ''
    );
  }

  handleInput(event: any) {

    const query =
      (event?.target?.value || '')
        .toString()
        .toLowerCase()
        .trim();

    if (!query) {
      this.results_search_histories = [
        ...this.list_search_histories
      ];
      return;
    }

    this.results_search_histories =
      this.list_search_histories.filter(
        (item) =>
          item.toLowerCase().includes(query)
      );
  }

  onSearchFocus() {

    this.search_histories = true;

    this.results_search_histories = [
      ...this.list_search_histories
    ];

    if (this.content) {
      this.content.scrollToPoint(
        0,
        0,
        500
      );
    }
  }

  deleteObjectHistory(value: string) {

    this.list_search_histories =
      this.list_search_histories.filter(
        item => item !== value
      );

    this.results_search_histories =
      this.results_search_histories.filter(
        item => item !== value
      );

    localStorage.setItem(
      'history',
      JSON.stringify(this.list_search_histories)
    );
  }

  // ============================================================
  // SEARCH
  // ============================================================

  submitForm = () => {

    const keyword =
      (this.ionicForm.value.name || '')
        .toString()
        .trim();

    const country =
      (this.ionicForm.value.country || '')
        .toString()
        .trim();

    this.search_histories = false;

    this.accessAPI(
      keyword,
      country
    );
  };

  // ============================================================
  // PRODUCT API
  // ============================================================

  accessAPI(
    keyword: string = '',
    country: string = ''
  ) {

    keyword =
      (keyword || '')
        .toString()
        .trim();

    country =
      (country || '')
        .toString()
        .trim();

    /*
     * Keep form synchronized with the actual API request.
     */
    if (this.ionicForm) {
      this.ionicForm.patchValue(
        {
          name: keyword,
          country: country
        },
        {
          emitEvent: false
        }
      );
    }

    /*
     * Reset state BEFORE API request.
     */
    this.loaded = false;
    this.product_present = false;
    this.showTextMain = false;

    this.error_result = null;

    this.result_products = null;

    this.list_products = [];

    this.next_page = 2;

    this.loadingMore = false;

    this.search_histories = false;

    console.log(
      'Search API:',
      {
        keyword,
        country,
        page: 1,
        page_size: this.page_size
      }
    );

    this._productService.products({
      keyword: keyword,
      country: country,
      page: 1,
      page_size: this.page_size
    }).subscribe(

      (response: any) => {

        console.log(
          'Search API response:',
          response
        );

        this.result_products = response || {};

        /*
         * Always make sure list_products is an array.
         */
        this.list_products =
          Array.isArray(response?.products)
            ? response.products
            : [];

        this.next_page = 2;

        this.product_present =
          this.list_products.length > 0;

        this.loaded = true;

        this.showTextMain =
          this.list_products.length === 0;

        /*
         * Only save non-empty searches.
         */
        this.saveSearchHistory(keyword);

        this.error_result = null;

        console.log(
          'Products loaded:',
          this.list_products.length
        );
      },

      (error: any) => {

        console.error(
          'Search API error:',
          error
        );

        this.error_result =
          error?.name || 'Error';

        this.loaded = true;

        this.product_present = false;

        this.showTextMain = false;

        this.list_products = [];

        this.result_products = null;
      }
    );
  }

  // ============================================================
  // INFINITE SCROLL
  // ============================================================

  loadMore = (event: any) => {

    if (this.loadingMore) {
      event?.target?.complete();
      return;
    }

    if (!this.result_products) {
      event?.target?.complete();
      return;
    }

    const total =
      Number(this.result_products.count || 0);

    if (
      total <= this.list_products.length ||
      this.list_products.length === 0
    ) {
      event?.target?.complete();
      return;
    }

    this.loadingMore = true;

    const keyword =
      (this.ionicForm.value.name || '')
        .toString()
        .trim();

    const country =
      (this.ionicForm.value.country || '')
        .toString()
        .trim();

    console.log(
      'Loading page:',
      this.next_page
    );

    this._productService.products({
      keyword: keyword,
      country: country,
      page: this.next_page,
      page_size: this.page_size
    }).subscribe(

      (response: any) => {

        const newProducts =
          Array.isArray(response?.products)
            ? response.products
            : [];

        this.list_products = [
          ...this.list_products,
          ...newProducts
        ];

        if (response?.count !== undefined) {
          this.result_products.count =
            response.count;
        }

        this.next_page++;

        this.loadingMore = false;

        event?.target?.complete();

        if (
          this.list_products.length >=
          Number(this.result_products.count || 0)
        ) {
          event.target.disabled = true;
        }

        console.log(
          'Products loaded:',
          this.list_products.length
        );
      },

      (error: any) => {

        console.error(
          'Error while loading more data:',
          error
        );

        this.loadingMore = false;

        event?.target?.complete();
      }
    );
  };

  // ============================================================
  // OPEN PRODUCT
  // ============================================================

  openProduct = (
    barcodeId: any,
    index: number
  ) => {

    if (
      index !== 0 &&
      index % 3 === 0
    ) {

      this._admobService
        .showInterstitial()
        .catch((error) => {
          console.error(
            'Interstitial error:',
            error
          );
        });
    }

    this._router.navigate([
      '/get-product',
      barcodeId
    ]);
  };

  // ============================================================
  // CLEAR SEARCH
  // ============================================================

  reloadPage() {

    /*
     * Do NOT reload the entire application.
     */
    if (!this.ionicForm) {
      this.initForm();
    }

    this.ionicForm.patchValue(
      {
        name: '',
        country: ''
      },
      {
        emitEvent: false
      }
    );

    this.search_histories = false;

    /*
     * Reload product list through API.
     */
    this.accessAPI(
      '',
      ''
    );
  }

  // ============================================================
  // REFRESH
  // ============================================================

  handleRefresh(event: any) {

    const keyword =
      (this.ionicForm?.value?.name || '')
        .toString()
        .trim();

    const country =
      (this.ionicForm?.value?.country || '')
        .toString()
        .trim();

    this._productService.products({
      keyword: keyword,
      country: country,
      page: 1,
      page_size: this.page_size
    }).subscribe(

      (response: any) => {

        this.result_products =
          response || {};

        this.list_products =
          Array.isArray(response?.products)
            ? response.products
            : [];

        this.next_page = 2;

        this.product_present =
          this.list_products.length > 0;

        this.loaded = true;

        this.showTextMain =
          this.list_products.length === 0;

        this.error_result = null;

        event?.target?.complete();
      },

      (error: any) => {

        console.error(
          'Refresh error:',
          error
        );

        this.error_result =
          error?.name || 'Error';

        this.loaded = true;

        this.product_present = false;

        this.list_products = [];

        this.showTextMain = false;

        event?.target?.complete();
      }
    );
  }
}