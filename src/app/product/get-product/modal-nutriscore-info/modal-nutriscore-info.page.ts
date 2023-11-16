import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-nutriscore-info',
  templateUrl: './modal-nutriscore-info.page.html',
  styleUrls: ['./modal-nutriscore-info.page.scss'],
})
export class ModalNutriscoreInfoPage implements OnInit {

  @Input() product: any;
  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this._modalCtrl.dismiss();
  }
}
