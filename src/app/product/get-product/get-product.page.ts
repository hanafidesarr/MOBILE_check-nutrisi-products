import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { ProductService } from './../../api/product.service';
import { LoadingService } from './../../api/loading.service';

import { register } from 'swiper/element/bundle';


import { ModalController } from '@ionic/angular';
import { ModalImagePage } from './modal-image/modal-image.page';
import { ModalNutriscoreInfoPage } from './modal-nutriscore-info/modal-nutriscore-info.page';
import { ModalEcoscoreInfoPage } from './modal-ecoscore-info/modal-ecoscore-info.page';
import { ModalNovascoreInfoPage } from './modal-novascore-info/modal-novascore-info.page';
import { App } from '@capacitor/app';

import JsBarcode from 'jsbarcode';

register();

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.page.html',
  styleUrls: ['./get-product.page.scss'],
})
export class GetProductPage implements OnInit {
  barcode: any;
  product: any;
  nutri_score: any;
  eco_score: any;
  nova_group: any;
  product_images: any[] = [];

  nutrient_levels_fat:any;
  nutrient_levels_saturated_fat:any;
  nutrient_levels_sugar:any;
  nutrient_levels_salt:any;
  
  isToastOpen = false;
  toast_message:string;
  
  list_favorites: any[] = [];

  backButtonListener: any;


  @ViewChild('generate_barcode') generate_barcode: ElementRef;


  constructor(private location: Location, private router: Router, private modalController: ModalController, private _route: ActivatedRoute, private _productService: ProductService, private _loadingService: LoadingService, private _router: Router) {

    const storedData = localStorage.getItem('list_favorites');
    if (storedData) {
      this.list_favorites = JSON.parse(storedData);
    }
    this._loadingService.showLoader();
    this._route.params.subscribe(params => {

      this.barcode = params['barcodeId'];


      this.getProduct(this.barcode)
    });
  }

  ngOnInit() {
    this.triggerBack();
  }

  triggerBack() {
    
    this.backButtonListener = App.addListener('backButton', () => {

      this._loadingService.hideLoader();
      
    });
  }

  handleRefresh(event:any) {
    setTimeout(() => {

      // this.location.replaceState(this.location.path());
      // window.location.reload();
      // Any calls to load data go here
      event.target.complete();
      
    }, 2000);
  }
  existObject(obj: any) {

    return obj && Object.keys(obj).length !== 0;
  }



  validation_nutrient_levels() {
    // FAT
    if (this.product?.nutrient_levels['fat'] == "low") {
      this.nutrient_levels_fat = "Rendah"
    }
    if (this.product?.nutrient_levels['fat'] == "moderate") {
      this.nutrient_levels_fat = "Cukup"
    }
    if (this.product?.nutrient_levels['fat'] == "high") {
      this.nutrient_levels_fat = "Tinggi"
    }
    // SATURATED FAT
    if (this.product?.nutrient_levels['saturated-fat'] == "low") {
      this.nutrient_levels_saturated_fat = "Rendah"
    }
    if (this.product?.nutrient_levels['saturated-fat'] == "moderate") {
      this.nutrient_levels_saturated_fat = "Cukup"
    }
    if (this.product?.nutrient_levels['saturated-fat'] == "high") {
      this.nutrient_levels_saturated_fat = "Tinggi"
    }

    // SUGAR
    if (this.product?.nutrient_levels['sugars'] == "low") {
      this.nutrient_levels_sugar = "Rendah"
    }
    if (this.product?.nutrient_levels['sugars'] == "moderate") {
      this.nutrient_levels_sugar = "Cukup"
    }
    if (this.product?.nutrient_levels['sugars'] == "high") {
      this.nutrient_levels_sugar = "Tinggi"
    }

    // SALT
    if (this.product?.nutrient_levels['salt'] == "low") {
      this.nutrient_levels_salt = "Rendah"
    }
    if (this.product?.nutrient_levels['salt'] == "moderate") {
      this.nutrient_levels_salt = "Cukup"
    }
    if (this.product?.nutrient_levels['salt'] == "high") {
      this.nutrient_levels_salt = "Tinggi"
    }
  }



  saveFavorite() {
    if (this.checkIfCodeExists(this.list_favorites, this.product.code)) {
      alert("data sudah ada di favorite")
      return;
    } else {
      this.list_favorites.unshift({ code: this.product.code, product_name: this.product.product_name, image_front_url: this.product.image_front_url, quantity: this.product.quantity, brands: this.product.brands, nutriscore_grade: this.product["nutriscore_grade"], ecoscore_grade: this.product["ecoscore_grade"] });
      localStorage.setItem('list_favorites', JSON.stringify(this.list_favorites)); 
      // const icon = document.querySelector('ion-icon');
      // if (icon) {
      //   icon.style.color = 'red';
      // }

      this.isToastOpen = true;
      this.toast_message = "Product telah di simpan"
    }


  }

  removeFavorite() {
    this.list_favorites = this.list_favorites.filter(
      (item) => item.code !== this.product.code
    );
    localStorage.setItem('list_favorites', JSON.stringify(this.list_favorites));
    this.isFavorite(null) 

    this.isToastOpen = true;
    this.toast_message = "Product telah di hapus"
  }

  isFavorite(code: any) {
    if(code){
      return this.checkIfCodeExists(this.list_favorites, code);
    } else {
      return false
    }
  }

  checkIfCodeExists(array:any[], codeToCheck: string): boolean {
    return array.some(item => item.code === codeToCheck);
  }

  // Toggle open 
  
  async openModalImage(item: any) {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      componentProps: {
        url: item,
      },
    });

    return await modal.present();
  }

  async openNutriScore(product: any) {
    const modal = await this.modalController.create({
      component: ModalNutriscoreInfoPage,
      componentProps: {
        product: product,
      },
    });
    return await modal.present();
  }
  
  async openEcoScore(product: any) {
    const modal = await this.modalController.create({
      component: ModalEcoscoreInfoPage,
      componentProps: {
        product: product,
      },
    });
    return await modal.present();
  }
  
  async openNovaScore(product: any) {
    const modal = await this.modalController.create({
      component: ModalNovascoreInfoPage,
      componentProps: {
        product: product,
      },
    });
    return await modal.present();
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  ionViewWillEnter(){
    JsBarcode(this.generate_barcode.nativeElement, this.barcode);
  }

  getProduct(barcode: any){
    this._productService.product({barcode_id: this.barcode}).subscribe(
      (response) => {
        this.product = response.product
        this.validation_nutrient_levels()

        this.product_images.push({ name: 'Image front', value: this.product.image_front_url });
        // this.product_images.push({ name: 'Object 2', value: this.product.image_url });
        this.product_images.push({ name: 'Object 3', value: this.product.image_ingredients_url });
        this.product_images.push({ name: 'Object 3', value: this.product.image_nutrition_url });
        this.product_images.push({ name: 'Object 3', value: this.product.image_packaging_url });
        this.product_images = this.product_images.filter(item => item.value !== undefined);

        this.nutri_score = "assets/nutriscore/nutriscore-" + ( this.product.nutriscore_grade || "unknown" ) + ".svg" || "assets/food-loading.gif"
        this.nova_group = "assets/nova/nova-group-" + ( this.product.nova_group || "unknown" ) + ".svg" || "assets/food-loading.gif"
        this.eco_score = "assets/ecoscore/ecoscore-" + ( this.product.ecoscore_grade || "unknown" ) + ".svg" || "assets/food-loading.gif"
        
        this._loadingService.hideLoader();
      },
      (error) => {
        if (error.status == 404) {
          alert("barcode tidak ada, yu tambah product baru")
        } else {
          alert(error.message)
        }
        this._router.navigate(['/tabs']);
        this._loadingService.hideLoader();
      }
    );
  }
}

