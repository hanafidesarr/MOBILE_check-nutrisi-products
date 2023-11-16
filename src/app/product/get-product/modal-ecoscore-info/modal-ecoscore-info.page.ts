import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ecoscore-info',
  templateUrl: './modal-ecoscore-info.page.html',
  styleUrls: ['./modal-ecoscore-info.page.scss'],
})
export class ModalEcoscoreInfoPage implements OnInit {

  @Input() product: any;
  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this._modalCtrl.dismiss();
  }
}
