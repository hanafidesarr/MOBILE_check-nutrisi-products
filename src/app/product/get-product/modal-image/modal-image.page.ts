import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage {
  @Input() url: any;

  constructor(private _modalCtrl: ModalController) {}

  closeModal() {
    this._modalCtrl.dismiss();
  }
  
}
