import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-not-barcode',
  templateUrl: './modal-not-barcode.page.html',
  styleUrls: ['./modal-not-barcode.page.scss'],
})
export class ModalNotBarcodePage implements OnInit {

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }
}
