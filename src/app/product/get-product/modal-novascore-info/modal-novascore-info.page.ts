import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-novascore-info',
  templateUrl: './modal-novascore-info.page.html',
  styleUrls: ['./modal-novascore-info.page.scss'],
})
export class ModalNovascoreInfoPage implements OnInit {

  @Input() product: any;
  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this._modalCtrl.dismiss();
  }
}
