import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-modal-barcode',
  templateUrl: './modal-barcode.page.html',
  styleUrls: ['./modal-barcode.page.scss'],
})
export class ModalBarcodePage implements OnInit {

  @ViewChild('generate_barcode') generate_barcode: ElementRef;

  @Input() barcode: any;
  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    JsBarcode(this.generate_barcode.nativeElement, this.barcode.rawValue);
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }
}
