import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ProductService } from './../../api/product.service';
import { LoadingService } from './../../api/loading.service';

import { register } from 'swiper/element/bundle';


import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

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
  
  
  isModalOpen = false;

  constructor(private modalController: ModalController, private _route: ActivatedRoute, private _productService: ProductService, public _loadingService: LoadingService, private _router: Router) {


    this._loadingService.showLoader();
    this._route.params.subscribe(params => {
      this.barcode = params['barcodeId'];

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

          this.nutri_score = "https://static.openfoodfacts.org/images/attributes/nutriscore-" + ( this.product.nutriscore_grade || "unknown" ) + ".svg" || "assets/food-loading.gif"
          this.nova_group = "https://static.openfoodfacts.org/images/attributes/nova-group-" + ( this.product.nova_group || "unknown" ) + ".svg" || "assets/food-loading.gif"
          this.eco_score = "https://static.openfoodfacts.org/images/attributes/ecoscore-" + ( this.product.ecoscore_grade || "unknown" ) + ".svg" || "assets/food-loading.gif"
          
          this._loadingService.hideLoader();
        },
        (error) => {
          if (error.status == 404) {
            alert("barcode tidak ada, yu tambah product baru")
          } else {
            alert(error.message)
            // this._loadingService.hideLoader();
          }
          this._loadingService.hideLoader();
          this._router.navigate(['/tabs']);
        }
      );
      // Now you can use the productId in your component
    });
  }

  ngOnInit() {
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  existObject(obj: any) {

    return obj && Object.keys(obj).length !== 0;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  async openModal(item: any) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        url: item,
      },
    });

    return await modal.present();
  }

}

