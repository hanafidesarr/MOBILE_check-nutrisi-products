import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';
import { AdmobService } from 'src/app/services/admob/admob.service';



@Component({
  selector: 'app-modal-nutriscore-info',
  templateUrl: './modal-nutriscore-info.page.html',
  styleUrls: ['./modal-nutriscore-info.page.scss'],
})
export class ModalNutriscoreInfoPage implements OnInit {

  @Input() product: any;
  constructor(public _admobService: AdmobService, private _modalCtrl: ModalController, public _translation_service: TranslationService) { }

  ngOnInit() {
    this._translation_service.init();
  }
  
  ionViewDidLeave() {
    // this._admobService.hideBanner()
    // this._admobService.RemoveBanner()
  }
  closeModal() {
    this._modalCtrl.dismiss();
  }
}
