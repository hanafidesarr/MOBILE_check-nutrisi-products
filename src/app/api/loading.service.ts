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
      spinner: null,
      cssClass: "asasasas",
      message: "<img src='assets/food-loading.gif' />"
    });
    await this.loading.present();
  }

  hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
