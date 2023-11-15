import { Component} from '@angular/core';

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';

import { FilePicker } from "@capawesome/capacitor-file-picker";


import { ModalController } from '@ionic/angular';
import { ModalBarcodePage } from './modal-barcode/modal-barcode.page';
import { ModalNotBarcodePage } from './modal-not-barcode/modal-not-barcode.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  

  backButtonListener: any;

  isSupported = false;
  barcode: any;
  barcodes: Barcode[] = [];

  is_not_barcode: boolean = false;
  is_product_empty: boolean = false;

  constructor(private _modalCtrl: ModalController, private alertController: AlertController, private _router: Router) {}



  ngOnInit() {

    this.backButtonListener = App.addListener('backButton', () => {
      this.isModalOpenNotBarcode(false)
      this.isModalOpenProductEmpty(false)
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
      this.presentAlert('Permision', 'belum di izinkan');
      return;
    }
    const { barcodes } = await BarcodeScanner.scan({
      formats: undefined,
    });
    this.barcodes.push(...barcodes);

    
    if (barcodes.length > 0) {
      barcodes.forEach((barcode) => {
        // this.presentAlert('Scanned Barcode', barcode.rawValue);
        if (barcode.format == "QR_CODE") {
          this.showModalNotBarcode(barcode)
          // this.presentAlert('Barocode salah', 'pastikan anda scan barcode, bukan QRCode');
          return;
        }
        this._router.navigate(['/get-product', barcode.rawValue]);
      });
    } else {
      this.barcode = this.barcodes[0]
      // this.presentAlert('No Barcode Scanned', 'No barcodes were detected.');
    }

  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(header: any, message: any): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  isModalOpenNotBarcode(isOpen: boolean) {
    this.is_not_barcode = isOpen;
  }

  isModalOpenProductEmpty(isOpen: boolean) {
    this.is_product_empty = isOpen;
  }
  

  async pickImage() {
    const { files } = await FilePicker.pickImages({
      multiple: false,
    });
    return files[0];
  }

  async scanFromImage() {
    try {
      const pickedImage = await this.pickImage();
      const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
        path: pickedImage.path || '',
      });


      if (barcodes.length > 0) {

        this.barcode = barcodes[0]
        if (this.barcode.format == "QR_CODE") {
          alert("ini QRCODE")
          // this.presentAlert('Barocode salah', 'pastikan anda scan barcode, bukan QRCode');
          return;
        } else {

          this.showModalBarcode(this.barcode)
          // this.is_product_empty = true

          // this.isModalOpenProductEmpty(true)
          
          // this.generateBarcode(this.barcode.rawValue)
        }
      } else {
        this.showModalNotBarcode(this.barcode)
      }
    } catch (error) {
      console.error('Error scanning QR Code:', error);
    }
  }

  async showModalBarcode(barcode: any) {
    const modal = await this._modalCtrl.create({
      component: ModalBarcodePage,
      componentProps: {
        barcode: barcode,
      },
    });

    return await modal.present();
  }

  async showModalNotBarcode(barcode: any) {
    const modal = await this._modalCtrl.create({
      component: ModalNotBarcodePage,
      componentProps: {
        barcode: barcode,
      },
    });

    return await modal.present();
  }
}

