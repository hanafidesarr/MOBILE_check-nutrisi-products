import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

import { PushNotifications } from '@capacitor/push-notifications';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _router: Router) {
    // Check if the intro has been viewed from localStorage
    const storedValue = localStorage.getItem('introViewed');
    const hasIntroBeenViewed = storedValue !== null && JSON.parse(storedValue);

    // If the intro hasn't been viewed, navigate to it
    if (!hasIntroBeenViewed) {
      this.navigateToIntro();
    }
  }
  
  ngOnInit() {
    // Hide the splash screen when the app component is initialized
    // SplashScreen.hide();

    this.addListeners()
    this.registerNotifications()
  }

  navigateToIntro() {
    this._router.navigate(['/intro']);
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
}
