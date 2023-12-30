import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdmobService } from 'src/app/services/admob/admob.service';

@Component({
  selector: 'app-problem-playservices',
  templateUrl: './problem-playservices.page.html',
  styleUrls: ['./problem-playservices.page.scss'],
})
export class ProblemPlayservicesPage implements OnInit {

  constructor(
    private _modalCtrl: ModalController,
    public _admobService: AdmobService) { }

  ngOnInit() {
    this._admobService.hideBanner()
    this._admobService.RemoveBanner()
  }

  ionViewDidLeave() {
    this._admobService.showBanner("top_center")
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }
}
