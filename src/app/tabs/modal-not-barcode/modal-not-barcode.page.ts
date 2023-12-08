import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';


@Component({
  selector: 'app-modal-not-barcode',
  templateUrl: './modal-not-barcode.page.html',
  styleUrls: ['./modal-not-barcode.page.scss'],
})
export class ModalNotBarcodePage implements OnInit {

  constructor(private _modalCtrl: ModalController, public _translation_service: TranslationService) {
    
    this._translation_service.init();
  }

  ngOnInit() {
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }
}
