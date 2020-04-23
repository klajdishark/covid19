import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
        zoom: 15
    };

    @ViewChild('mapElement') mapElement;

    constructor(
        private activatedRoute: ActivatedRoute
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

        const myLatLng = {
            lat: 41.317532,
            lng: 19.445172
        };

        const marker = new google.maps.Marker({
            position: myLatLng,
        });

        marker.setMap(this.map);
    }


    loadMap(coordinates) {
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.yourLocation);

        const marker = new google.maps.Marker({
            position: coordinates,
        });

        const marker1 = new google.maps.Marker({
            position: {
                lat: 41.317532,
                lng: 19.445172,
            },
        });

        marker.setMap(this.map);
        marker1.setMap(this.map);

        this.map.setCenter(marker.getPosition());
    }
}
