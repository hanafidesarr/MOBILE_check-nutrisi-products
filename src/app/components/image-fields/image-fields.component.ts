import { Component, Input } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

import { LoadingService } from './../../api/loading.service';
import { TranslationService } from 'src/app/api/translation.service';

@Component({
  selector: 'app-image-fields',
  templateUrl: './image-fields.component.html',
  styleUrls: ['./image-fields.component.scss']
})
export class ImageFieldsComponent {

  @Input() product: any;
  @Input() imageLoading: any;
  @Input() allImages: any;
  @Input() is_add_product = false;
  @Input() is_image_thumb_url = false;

  @Input() onImageSelected!: Function;

  fields = [
    'image_front_url',
    'image_ingredients_url',
    'image_nutrition_url',
    'image_packaging_url'
  ];

  // labelMap: any = {
  //   image_front_url: 'Front Image',
  //   image_ingredients_url: 'Ingredients',
  //   image_nutrition_url: 'Nutrition',
  //   image_packaging_url: 'Packaging'
  // };
  labelMap: any;

  constructor(private alertCtrl: AlertController, private _loadingService: LoadingService, public _translation_service: TranslationService) {
    this.labelMap = {
      image_front_url: this._translation_service.translateKey('front_image'),
      image_ingredients_url: this._translation_service.translateKey('ingredients'),
      image_nutrition_url: this._translation_service.translateKey('nutrition'),
      image_packaging_url: this._translation_service.translateKey('packaging')
    };
  }

  /** Common loader triggers */
  onLoaded(field: string) {
    this.imageLoading[field] = false;
    this._translation_service.init();
  }
  onError(field: string) {
    this.imageLoading[field] = false;
  }
  onSelect(event: any, field: string) {
    this.onImageSelected(event, field);
  }

  /** Fake event untuk kamera/gallery */
  private createFakeEvent(dataUrl: string) {
    return {
      target: {
        files: [{ dataUrl }]
      }
    };
  }

  /** Permission camera */
  private async ensureCameraPermission() {
    const s = await Camera.checkPermissions();
    if (s.camera === 'granted') return true;

    const req = await Camera.requestPermissions();
    return req.camera === 'granted';
  }

  async openCamera(field: string) {
    const image = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 70,
      resultType: CameraResultType.DataUrl,
      allowEditing: true
    });

    const file = this.dataURLtoFile(image.dataUrl!, "camera.jpg");

    const fakeEvent = {
      target: { files: [file] }
    };

    this.onSelect(fakeEvent, field);
  }


  async openGallery(field: string) {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 70,
      resultType: CameraResultType.DataUrl,
      allowEditing: true
    });

    const file = this.dataURLtoFile(image.dataUrl!, "gallery.jpg");

    const fakeEvent = {
      target: { files: [file] }
    };

    this.onSelect(fakeEvent, field);
  }

  /** Alert reusable */
  async showDeniedAlert(type: string) {
    const alert = await this.alertCtrl.create({
      header: `Izin ${type} dibutuhkan`,
      message: `Aplikasi membutuhkan izin ${type}. Silakan aktifkan di pengaturan.`,
      buttons: ['OK']
    });
    alert.present();
  }

  dataURLtoFile(dataUrl: string, filename: string) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  getThumbField(field: string): string {
    return field.replace('_url', '_small_url');
  }

}
