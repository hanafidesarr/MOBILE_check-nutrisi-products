import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-modal-badan-pom',
  templateUrl: './modal-badan-pom.page.html',
  styleUrls: ['./modal-badan-pom.page.scss'],
})
export class ModalBadanPomPage implements OnInit {

  constructor(public _modalCtrl: ModalController) { }

  ngOnInit() {
  }
  
  closeModal() {
    this._modalCtrl.dismiss();
  }
  
}
