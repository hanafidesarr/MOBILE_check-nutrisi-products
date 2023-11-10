import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public _loadingCtrl: LoadingController) { }
  loading: any;

  async showLoader() {
    this.loading = await this._loadingCtrl.create({
      spinner: 'crescent',
      // message: "<img src='assets/food-loading.gif' style='width:50px !important;height:50px !important'/>"
    });
    await this.loading.present();
  }

  hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
