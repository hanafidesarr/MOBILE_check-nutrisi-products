import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/api/product.service';

@Component({
  selector: 'modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss'],
})
export class ModalAddProductComponent implements OnInit {
  @Input() productData: any; // input dari parent

  product: { code: string; product_name: string; brands: string } = {
    code: '',
    product_name: '',
    brands: '',
  };

  isSubmitting = false;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Pastikan productData diisi sebelum binding
    if (this.productData) {
      this.product = {
        code: this.productData.code || '',
        product_name: this.productData.product_name || '',
        brands: this.productData.brands || '',
      };
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async submit() {
    // if (!this.product.code || !this.product.product_name || !this.product.brands) {
    //   await this.showToast('Please fill in all fields');
    //   return;
    // }

    this.isSubmitting = true;

    try {
      let res;
      if (this.productData) {
        // Edit product
        const payload = { ...this.product }; // Jangan sertakan properti ekstra
        res = await this.productService.editProduct(payload);
      } else {
        // Add product
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
}
