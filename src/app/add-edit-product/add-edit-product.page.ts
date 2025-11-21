import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/api/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.page.html',
  styleUrls: ['./add-edit-product.page.scss'],
})

export class AddEditProductPage implements OnInit {

  productData: any;
  is_add_product: boolean = true;
  is_redirect_to_bookmark: boolean = false;

  product: any = {};
  allFields: string[] = [];
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Ambil data dari query params
    this.route.queryParams.subscribe(params => {
      this.productData = { code: params['code'] || '' };
      this.is_add_product = params['is_add_product'] === 'true';
      this.is_redirect_to_bookmark = params['is_redirect_to_bookmark'] === 'true';
      this.loadProduct();
    });
  }

  loadProduct() {
    // ------- 1. Jika dari scan -------
    if (this.is_add_product) {
      this.product = {
        code: this.productData.code,
        product_name: '',
        brands: ''
      };
      this.allFields = Object.keys(this.product);
      return;
    }

    // ------- 2. Jika edit -------
    if (this.productData.code) {
      this.productService.product({ barcode_id: this.productData.code })
        .subscribe(
          (response: any) => {
            const p = response?.product;

            if (p) {
              this.product = { ...p, code: p.code || this.productData.code };
            } else {
              this.product = {
                code: this.productData.code,
                product_name: '',
                brands: ''
              };
            }
            this.allFields = Object.keys(this.product);
          },
          () => {
            this.product = {
              code: this.productData.code,
              product_name: '',
              brands: ''
            };
            this.allFields = Object.keys(this.product);
          }
        );
      return;
    }

    // ------- 3. Manual add -------
    this.product = {
      code: '',
      product_name: '',
      brands: ''
    };
    this.allFields = Object.keys(this.product);
  }

  async submit() {
    this.isSubmitting = true;

    try {
      let res;

      if (this.is_add_product) {
        res = await this.productService.addProduct(this.product);
      } else if (this.productData?.code) {
        res = await this.productService.editProduct(this.product);
      } else {
        res = await this.productService.addProduct(this.product);
      }

      this.isSubmitting = false;
      await this.showToast('Product saved successfully');
      if (this.is_redirect_to_bookmark) {
        this.router.navigate(['/tabs/bookmark']);
      } else {
        this.router.navigate(['/get-product', this.productData?.code]);
      }

    } catch (err) {
      console.error(err);
      this.isSubmitting = false;
      await this.showToast('Failed to save product');
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  isLongText(v: any) {
    return typeof v === 'string' && v.length > 40;
  }
  
}
