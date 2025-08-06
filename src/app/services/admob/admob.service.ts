import { Injectable } from '@angular/core';
import { AdMob, AdOptions, InterstitialAdPluginEvents, AdmobConsentStatus, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize, RewardAdOptions, AdLoadInfo, RewardAdPluginEvents, AdMobRewardItem } from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  constructor() {
    this.initialize();
  }

  async initialize():Promise<void> {
    await AdMob.initialize();
    const [trackingInfo, consentInfo] = await Promise.all([
     AdMob.trackingAuthorizationStatus(),
     AdMob.requestConsentInfo(),
    ]);
   
    if (trackingInfo.status === 'notDetermined') {
     /**
      * If you want to explain TrackingAuthorization before showing the iOS dialog,
      * you can show the modal here.
      * ex)
      * const modal = await this.modalCtrl.create({
      *   component: RequestTrackingPage,
      * });
      * await modal.present();
      * await modal.onDidDismiss();  // Wait for close modal
      **/
   
     await AdMob.requestTrackingAuthorization();
    }
  
    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (
            authorizationStatus.status === 'authorized' &&
            consentInfo.isConsentFormAvailable &&
            consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
     await AdMob.showConsentForm();
    }
  }

  async showBanner(position: any) {
    if (position == "top_center") {
      var banner_position = BannerAdPosition.TOP_CENTER
    } else if (position == "bottom_center") {
      var banner_position = BannerAdPosition.BOTTOM_CENTER
    } else {
      var banner_position = BannerAdPosition.CENTER
    }
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    });

    const adId = 'ca-app-pub-3940256099942544/6300978111'
    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.BANNER,
      position: banner_position,
      margin: 0,
      // isTesting: true,
      // npa: true
    };
    await AdMob.showBanner(options);
  }

  async hideBanner() {
    await AdMob.hideBanner();
  }

  async RemoveBanner() {
    await AdMob.removeBanner();
  }

  async showInterstitial() {
    const adId = 'ca-app-pub-3940256099942544/1033173712'
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared interstitial
    });
  
    const options: AdOptions = {
      adId,
      // isTesting: true,
      // npa: true
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();

  }

  async showRewardVideo() {
    AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared rewardVideo
    });
  
    AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
      // Subscribe user rewarded
      console.log(rewardItem);
    });
  
    const adId = 'android-ad-unit'
    const options: RewardAdOptions = {
      adId,
      // isTesting: true,
      // npa: true
      // ssv: {
      //   userId: "A user ID to send to your SSV"
      //   customData: JSON.stringify({ ...MyCustomData })
      //}
    };
    await AdMob.prepareRewardVideoAd(options);
    const rewardItem = await AdMob.showRewardVideoAd();
  }
}
