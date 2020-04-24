import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    locationTime = null;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public translate: TranslateService,) {
        this.initializeApp();
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    // noinspection JSMethodCanBeStatic
    setTrackingStatus(value) {
        const setTrackingStatus = {isTracking: null};
        setTrackingStatus.isTracking = value;
        localStorage.setItem('isTracking', JSON.stringify(setTrackingStatus));
    }

    // noinspection JSMethodCanBeStatic
    getTrackingStatus() {
        const isTracking = localStorage.getItem('isTracking');
        if (isTracking !== null) {
            return JSON.parse(isTracking).isTracking;
        }
        return;
    }
}
