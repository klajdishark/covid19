import {Component} from '@angular/core';
import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig,
    BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    private searchIcon = 'fa fa-search';
    private alertIcon = 'fa fa-exclamation';
    private dangerColor = '#c91d12';

    constructor(
        private backgroundGeolocation: BackgroundGeolocation,
        private http: HTTP,
        private router: Router
    ) {
        // setInterval(() => {
        //     this.startBackgroundGeolocation();
        // }, 20000);

        // setTimeout(() => {
        // document.getElementById('content').style.setProperty('--background', this.dangerColor);
        // document.getElementById('title').innerHTML = '200 meters from you is a threat.';
        // document.getElementById('icon').setAttribute('class', this.alertIcon);
        // document.getElementById('pulse').style.backgroundColor = 'red' ;
        // }, 5000);
    }

    startBackgroundGeolocation() {
        const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 1,
            distanceFilter: 1,
            debug: false,
            stopOnTerminate: false // enable this to clear background location settings when the app terminates
        };

        this.backgroundGeolocation.configure(config).then(() => {
            this.backgroundGeolocation
                .on(BackgroundGeolocationEvents.location)
                .subscribe((location: BackgroundGeolocationResponse) => {
                    console.log(location);
                    this.sendGPS(location);

                    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                    // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
                    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                });
        });

        // start recording location
        this.backgroundGeolocation.start();

        // If you wish to turn OFF background-tracking, call the #stop method.
        this.backgroundGeolocation.stop();
    }

    sendGPS(location) {
        if (location.speed === undefined) {
            location.speed = 0;
        }

        const timestamp = new Date(location.time);

        const request = {
            lat: location.latitude,
            lng: location.longitude,
            speed: location.speed,
            timestamp: timestamp
        };

        console.log(request);
    }
}
