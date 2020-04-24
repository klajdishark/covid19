import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';

declare var google;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    map;
    yourLocation = {
        center: {
            lat: 41.317532,
            lng: 19.445172
        },
        zoom: 18
    };

    @ViewChild('mapElement') mapElement;

    constructor(
        private activatedRoute: ActivatedRoute,
        private loaderController: LoadingController
    ) {
        this.activatedRoute.queryParams.subscribe(e => {
            if (Object.keys(e).length !== 0) {
                const coordinates = {
                    lat: parseFloat(e.lat),
                    lng: parseFloat(e.lng),
                };

                console.log(coordinates);
                this.loadMap(coordinates);
            }
        });
    }

    ngOnInit() {
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.yourLocation);

        const circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 0.1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            center: this.yourLocation.center,
            radius: 10
        });

        const circle1 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 0.1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            center: {lat: 41.3168048, lng: 19.4449902},
            radius: 10
        });


        const circle2 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 0.1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            center: {lat: 41.3158387, lng: 19.4433726},
            radius: 10
        });

        circle.setMap(this.map);
        circle1.setMap(this.map);
        circle2.setMap(this.map);
    }


    async loadMap(coordinates) {
        const loader = await this.loaderController.create();
        loader.present();

        this.map = await new google.maps.Map(this.mapElement.nativeElement, this.yourLocation);

        const marker = await new google.maps.Marker({
            position: coordinates,
        });

        marker.setMap(this.map);
        loader.dismiss();

        this.map.setCenter(marker.getPosition());
    }
}
