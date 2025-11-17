import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { App } from '@capacitor/app';
import { TranslationService } from '../api/translation.service';
import { AdmobService } from '../services/admob/admob.service';
import { ModalAddProductComponent } from '../product/add-product/modal-add-product/modal-add-product.component';
import { ProductService, LocalProduct } from 'src/app/api/product.service';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {

  selectedTab: string = 'bookmark';
  isSupported = false;
  list_favorites: any;
  barcodes: Barcode[] = [];

  backButtonListener: any;
  localProducts: LocalProduct[] = [];

  constructor(public _admobService: AdmobService, private _router: Router, public _translation_service: TranslationService, private alertController: AlertController, private modalCtrl: ModalController, private productService: ProductService ) {

    this._translation_service.init();
  }

  
  ionViewWillEnter() {
    this.getFavorites()
    this.loadLocalProducts();
  }

  async loadLocalProducts() {
    this.localProducts = await this.productService.getLocalProducts();
  }


  getFavorites() {

    this.list_favorites = localStorage.getItem('list_favorites')
    this.list_favorites = JSON.parse(this.list_favorites)
    console.log(this.list_favorites)
  }
  ngOnInit() {

    this.loadLocalProducts();
    this.backButtonListener = App.addListener('backButton', () => {

      this.getFavorites()
    });

    BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then((result) => {
      if(result.available) {
        return;
      } else {
        BarcodeScanner.installGoogleBarcodeScannerModule().then((result) => {
          console.log("GoogleBarcodeScannerModule SUDAH DI INSTALL COY")
        });
      }
    })

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    
    console.log(BarcodeScanner.isGoogleBarcodeScannerModuleAvailable())
    
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    
    this.barcodes.push(...barcodes);

  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  deleteFavorite(index: number) {
    if (index >= 0 && index < this.list_favorites.length) {
      console.log(index)
      this.list_favorites.splice(index, 1); // Remove the item from the array
      localStorage.setItem('list_favorites', JSON.stringify(this.list_favorites)); // Update local storage
    }
  }

  openProduct = (barcodeId: any, index:any) => {

    if (index !== 0 && index % 10 === 0) {
      this._admobService.showInterstitial()
    }
    this._router.navigate(['/get-product', barcodeId]);
  }
  async openAddProductModal(productData?: any) {
    const modal = await this.modalCtrl.create({
      component: ModalAddProductComponent,
      componentProps: { productData } // <-- kirim data di sini
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.role === 'submitted') {
        this.loadLocalProducts(); // reload produk lokal
      }
    });
  }
  

}
