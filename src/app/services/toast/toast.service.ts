import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _toastCtrl: ToastController) { }
  async presentToast(text:any) {
    const toast = await this._toastCtrl.create({
      message: text,
      duration: 1000,
      position: 'bottom',
    });

    await toast.present();
  }
}
