import { Component } from '@angular/core';

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {}

  ngOnInit() {

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
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    if (barcodes.length > 0) {
      barcodes.forEach((barcode) => {
        this.presentAlert('Scanned Barcode', barcode.rawValue);
      });
    } else {
      this.presentAlert('No Barcode Scanned', 'No barcodes were detected.');
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

  
}

