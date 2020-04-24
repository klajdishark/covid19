import {Component, OnInit} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    private searchIcon = 'fa fa-search';
    private alertIcon = 'fa fa-exclamation';
    private startIcon = null;

    private dangerColor = '#c91d12';
    private warningColor = '#FF8F00';
    private safeColor = '#5540ff';
    private healthColor = '#00cc9d';


    locationTime = null;
    isTracking = null;
    startTracking = true;

    constructor(
        private backgroundGeolocation: BackgroundGeolocation,
    ) {
        if (this.getTrackingStatus()) {
            this.startIcon = this.searchIcon;
        } else {
            this.startIcon = this.alertIcon;
        }

        // setTimeout(() => {
        // document.getElementById('content').style.setProperty('--background', this.dangerColor);
        // document.getElementById('title').innerHTML = '200 meters from you is a threat.';
        // document.getElementById('icon').setAttribute('class', this.alertIcon);
        // document.getElementById('pulse').style.backgroundColor = 'red' ;
        // }, 5000);
    }


    takeActionTracking() {
        if (this.isTracking) {
            this.backgroundGeolocation.stop();
            this.isTracking = false;
            this.changeBackground(this.warningColor, 'Tap on icon to start tracking!', this.alertIcon, 'red', 'none');
            return;
        }

        if (!this.isTracking) {
            this.isTracking = true;
            this.backgroundGeolocation.start();
            this.changeBackground(this.safeColor, 'No threads', this.searchIcon, this.healthColor, 'pulse');
            return;
        }
    }


    ngOnInit(): void {
        if (!this.getTrackingStatus()) {
            this.changeBackground(this.warningColor, 'Tap on icon to start tracking!', this.alertIcon, 'red', 'none');
        } else {
            console.log(1);
            this.changeBackground(this.safeColor, 'No threads', this.searchIcon, this.healthColor, 'pulse');
        }
    }

    // noinspection JSMethodCanBeStatic
    getTrackingStatus() {
        const isTracking = localStorage.getItem('isTracking');
        if (isTracking !== null) {
            return JSON.parse(isTracking).isTracking;
        }
        return;
    }


    changeBackground(color, titleText, icon, iconColor, animantion) {
        document.getElementById('content').style.setProperty('--background', color);
        document.getElementById('title').innerHTML = titleText;
        document.getElementById('icon').setAttribute('class', icon);
        document.getElementById('pulse').style.backgroundColor = iconColor;
        document.getElementById('pulse').style.animationName = animantion;
    }
}
