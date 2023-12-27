import { Component, OnInit } from '@angular/core';
import { AdmobService } from '../services/admob/admob.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(
    public _modalCtrl: ModalController,
    public _admobService: AdmobService
  ) { }

  ngOnInit() {
    this._admobService.showRewardVideo()
  }
  closeModal() {
    this._modalCtrl.dismiss();
  }
}
