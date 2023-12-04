import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
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
  }
  navigateToIntro() {
    this._router.navigate(['/intro']);
  }
}
