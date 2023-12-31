
import { Component, OnInit, NgZone } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';

import { App } from '@capacitor/app';

import { AlertController } from '@ionic/angular';

// import {
//   BarcodeScanner,
//   BarcodeFormat,
// } from "@capacitor-mlkit/barcode-scanning";
// import { FilePicker } from "@capawesome/capacitor-file-picker";

// Services
import { TranslationService } from '../api/translation.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  barcode:any;
  backButtonListener: any;
  currentLanguage: any;

  constructor(private _toast_service: ToastService, public _translation_service: TranslationService, private ngZone: NgZone, public photoService: PhotoService, private _router: Router, private alertController: AlertController) { }

  ngOnInit() {
    
    // this.triggerBack()
    this._translation_service.init();
    this.currentLanguage = this._translation_service.getCurrentLanguage();
  }

  changeSelectLang(e:any) {
    this._translation_service.setLanguage(this.currentLanguage);
    setTimeout(() => {
      // This code will be executed if the translation takes longer than the specified timeout
      
      this._toast_service.presentToast(this._translation_service.translateKey('change_language'))
    }, 1000);
  }

  // triggerBack(){
  //   this.backButtonListener = App.addListener('backButton', () => {
  //     this.stopScan()
  //   });
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // async pickImage() {
  //   const { files } = await FilePicker.pickImages({
  //     multiple: false,
  //   });
  //   return files[0];
  // }

  // async scanFromImage() {
  //   try {
  //     const pickedImage = await this.pickImage();
  //     const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
  //       path: pickedImage.path || '',
  //     });

  //     if (barcodes.length > 0) {

  //       barcodes.forEach((barcode) => {
  //         // this.presentAlert('Scanned Barcode', barcode.rawValue);
  //         if (barcode.format == "QR_CODE") {
  //           this.barcode = barcode
  //           alert("ini QRCODE")
  //           // this.presentAlert('Barocode salah', 'pastikan anda scan barcode, bukan QRCode');
  //           return;
  //         }
  //         this._router.navigate(['/get-product', barcode.rawValue]);
  //       });

  //       const scannedValue = barcodes[0].rawValue;
  //       console.log('Scanned QR Code:', scannedValue);
  //       // Handle the scanned value as needed.
  //     } else {
  //       alert('No QR Code found in the image.');
  //     }
  //   } catch (error) {
  //     console.error('Error scanning QR Code:', error);
  //   }
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // async scanSingleBarcode() {
  //   return new Promise(async (resolve) => {
  //     document.querySelector('body')?.classList.add('barcode-scanner-active');

  //     const listener = await BarcodeScanner.addListener(
  //       'barcodeScanned',
  //       async (result) => {
  //         await listener.remove();
  //         document
  //           .querySelector('body')
  //           ?.classList.remove('barcode-scanner-active');
  //         await BarcodeScanner.stopScan();
  //         this.ngZone.run(() => resolve(result.barcode));
  //         this.ngZone.run(() => alert(result.barcode.rawValue))
  //       }
  //     );

  //     await BarcodeScanner.startScan();
  //   });
  // }
  
  // async stopScan () {
  //   // Make all elements in the WebView visible again
  //   document.querySelector('body')?.classList.remove('barcode-scanner-active');
  
  //   // Remove all listeners
  //   await BarcodeScanner.removeAllListeners();
  
  //   // Stop the barcode scanner
  //   await BarcodeScanner.stopScan();
  // };


  functionNotReady() {
    this.presentAlertInfo()
  }

  async presentAlertInfo(): Promise<void> {
    const alert = await this.alertController.create({
      header: this._translation_service.translateKey('sorry'),
      message: this._translation_service.translateKey('feature_not_avaliable'),
      buttons: ['OK'],
    });
    await alert.present();
  }
}
