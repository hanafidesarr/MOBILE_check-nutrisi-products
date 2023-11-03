import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ProductService } from './../../api/product.service';
import { LoadingService } from './../../api/loading.service';


import { register } from 'swiper/element/bundle';

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

  constructor(private _route: ActivatedRoute, private _productService: ProductService, public _loadingService: LoadingService, private _router: Router) {
    this._route.params.subscribe(params => {
      
      this.barcode = params['barcodeId'];

      this._productService.product({barcode_id: this.barcode}).subscribe(
        (response) => {

          this.product = response.product
          this.product_images.push({ name: 'Image front', value: this.product.image_front_url });
          // this.product_images.push({ name: 'Object 2', value: this.product.image_url });
          this.product_images.push({ name: 'Object 3', value: this.product.image_ingredients_url });
          this.product_images.push({ name: 'Object 3', value: this.product.image_nutrition_url });
          this.product_images.push({ name: 'Object 3', value: this.product.image_packaging_url });
          this.product_images = this.product_images.filter(item => item.value !== undefined);

          this.nutri_score = "https://static.openfoodfacts.org/images/attributes/nutriscore-" + ( this.product.nutriscore_grade || "unknown" ) + ".svg" || "assets/food-loading.gif"
          this.nova_group = "https://static.openfoodfacts.org/images/attributes/nova-group-" + ( this.product.nova_group || "unknown" ) + ".svg" || "assets/food-loading.gif"
          this.eco_score = "https://static.openfoodfacts.org/images/attributes/ecoscore-" + ( this.product.ecoscore_grade || "unknown" ) + ".svg" || "assets/food-loading.gif"

        },
        (error) => {
          if (error.status == 404) {
            alert("barcode tidak ada, yu tambah product baru")
          } else {
            alert(error.message)
          }
          
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

}
