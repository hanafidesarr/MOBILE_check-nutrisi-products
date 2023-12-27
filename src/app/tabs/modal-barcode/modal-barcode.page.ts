import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';
import JsBarcode from 'jsbarcode';
import { AdmobService } from 'src/app/services/admob/admob.service';

@Component({
  selector: 'app-modal-barcode',
  templateUrl: './modal-barcode.page.html',
  styleUrls: ['./modal-barcode.page.scss'],
})
export class ModalBarcodePage implements OnInit {

  @ViewChild('generate_barcode') generate_barcode: ElementRef;

  @Input() barcode: any;
  constructor(public _admobService: AdmobService, private _modalCtrl: ModalController, private _router: Router, public _translation_service: TranslationService) {
    this._translation_service.init();
  }

  ngOnInit() {
    this._admobService.showBanner("bottom_center")
  }
  
  ionViewDidLeave() {
    // this._admobService.hideBanner()
    // this._admobService.RemoveBanner()
  }

  ionViewWillEnter(){
    JsBarcode(this.generate_barcode.nativeElement, this.barcode.rawValue);
  }

  goToProduct(){

    this._router.navigate(['/get-product', this.barcode.rawValue]);

    this._modalCtrl.dismiss();
  }
  
  closeModal() {
    this._modalCtrl.dismiss();
  }
}
