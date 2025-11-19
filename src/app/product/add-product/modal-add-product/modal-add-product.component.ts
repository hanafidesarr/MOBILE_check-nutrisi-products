import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/api/product.service';

@Component({
  selector: 'modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss'],
})
export class ModalAddProductComponent implements OnInit {
  @Input() productData: any;
  @Input() from_scan: boolean = false;

  product: any = {};
  allFields: string[] = [];

  isSubmitting = false;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {

    // -----------------------------------------------------
    // 1. Jika SCAN → jangan ambil dari OFF, langsung tambah
    // -----------------------------------------------------
    if (this.from_scan) {
      this.product = {
        code: this.productData?.code || '',
        product_name: '',
        brands: ''
      };
      this.allFields = Object.keys(this.product);
      return;
    }

    // -----------------------------------------------------
    // 2. Jika EDIT produk (bukan scan) dan ada code → fetch dari OFF
    // -----------------------------------------------------
    if (this.productData?.code) {
      this.productService.product({ barcode_id: this.productData.code })
        .subscribe(
          (response: any) => {
            const p = response?.product;

            if (p) {
              this.product = { ...p };
              this.product.code = p.code || this.productData.code;
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
            // fallback fetch gagal
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

    // -----------------------------------------------------
    // 3. Tambah produk manual
    // -----------------------------------------------------
    this.product = {
      code: '',
      product_name: '',
      brands: ''
    };
    this.allFields = Object.keys(this.product);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // -----------------------------------
  // SUBMIT
  // -----------------------------------
  async submit() {
    this.isSubmitting = true;

    try {
      let res;

      if (this.from_scan) {
        // SCAN → selalu ADD
        res = await this.productService.addProduct(this.product);

      } else if (this.productData) {
        // Non-scan EDIT
        res = await this.productService.editProduct(this.product);

      } else {
        // Manual ADD
        res = await this.productService.addProduct(this.product);
      }

      this.isSubmitting = false;
      await this.showToast('Product saved successfully ✅');

      this.modalCtrl.dismiss(res, 'submitted');

    } catch (err) {
      console.error('Error saving product:', err);
      this.isSubmitting = false;
      await this.showToast('Failed to save product ❌');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'medium',
    });
    await toast.present();
  }

  isLongText(value: any) {
    return typeof value === 'string' && value.length > 40;
  }
}
