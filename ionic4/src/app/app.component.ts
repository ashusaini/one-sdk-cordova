import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      var one = window.One;
      
      if (one) {
          one.init({
                  siteKey: "ONE-XXXXXXXXXX-1022",
                  touchpointURI: "myAppsNameURI",
                  apiKey: "f713d44a-8af0-4e79-ba7e-xxxxxxxxx",
                  sharedSecret: "bb8bacb2-ffc2-4c52-aaf4-xxx",
                  userId: "yourUsername@yourCompanyName",
                  adminMode: false,
                  hostName: "https://xx.thunderhead.com"
                  }
                  );
          one.sendInteraction('/App', null);
          one.sendBaseTouchpointProperties({key:'value'});
          one.sendInteractionForOutboundLink('https://www.thunderhead.com/?key=value');
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
