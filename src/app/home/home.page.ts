import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslationService } from '../api/translation.service';
import { ProductService } from '../api/product.service';
import { PushNotifications } from '@capacitor/push-notifications';
import { LoadingService } from '../api/loading.service';


register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  loading: boolean = true;
  response: any;
  total_all_products: any = 3009515;
  constructor(
    public _translation_service: TranslationService, 
    private _productService: ProductService,
    private _loadingService: LoadingService) {
    // Initialize the translation service

    // this.getProducts()
    this._translation_service.init();
  }

  ngOnInit() {
    this.get_products_count() 
    this.addListeners()
    this.registerNotifications()
  }
  // getProducts() {
  //   this._productService.products({keyword: "", country: "", page: 1, page_size: 10}).subscribe(
  //     (response) => {
  //       this.response = response
  //     }
  //   )
  // }
  handleImageError() {
    this.loading = false; // Hide the loading spinner
  }
 
  handleImageDidLoad() {
    this.loading = false; // Hide the loading spinner when the image is loaded
  }

  addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      // alert('Registration token: ' + token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      // alert('Registration error: ' + err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      // alert('Push notification received: ' + notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      // action when notification clicked
      // alert('Push notification action performed' + notification.actionId + notification.inputValue);

    });
  }
  
  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    if (permStatus.receive !== 'granted') {
      try{
        await PushNotifications.register();
      }
      catch(e){console.log(JSON.stringify(e))}
    }
  
    
  }
  
  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    alert('delivered notifications'+ JSON.stringify(notificationList));
  }

  get_products_count() {
    this._productService.products_count().subscribe(
      (response) => {
        this.total_all_products = response.count
      })

  }
}
