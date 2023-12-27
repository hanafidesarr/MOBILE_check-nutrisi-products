import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';
import { AdmobService } from 'src/app/services/admob/admob.service';


@Component({
  selector: 'app-modal-not-barcode',
  templateUrl: './modal-not-barcode.page.html',
  styleUrls: ['./modal-not-barcode.page.scss'],
})
export class ModalNotBarcodePage implements OnInit {

  constructor(public _admobService: AdmobService, private _modalCtrl: ModalController, public _translation_service: TranslationService) {
    
    this._translation_service.init();
  }

  ngOnInit() {

    this._admobService.showBanner("bottom_center")
  }
  
  ionViewDidLeave() {
    // this._admobService.hideBanner()
    // this._admobService.RemoveBanner()
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }

  
}
