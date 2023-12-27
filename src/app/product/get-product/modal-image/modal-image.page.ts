import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdmobService } from 'src/app/services/admob/admob.service';


@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage {
  @Input() url: any;
  url_full: any;

  loading: boolean;

  constructor(public _admobService: AdmobService, private _modalCtrl: ModalController) {}

  ngOnInit(){
    let parts = this.url.split('.');
    parts[parts.length - 2] = 'full';
    this.url_full = parts.join('.');

    this.loading = true; // Hide the loading spinner

  }

  
  ionViewWillLeave() {
    this.loading = false; // Hide the loading spinner

  }

  ionViewDidLeave() {
    this.loading = false; // Hide the loading spinner

    // this._admobService.hideBanner()
    // this._admobService.RemoveBanner()

  }
  handleImageError() {
    this.loading = false; // Hide the loading spinner
  }
 
  handleImageDidLoad() {
    this.loading = false; // Hide the loading spinner when the image is loaded
  }
  
  closeModal() {
    this._modalCtrl.dismiss();
  }
  
}
