import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private storage: SQLiteObject;
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
        private httpClient: HttpClient,
        private sqlPorter: SQLitePorter
    ) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'locations.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.storage = db;
                this.seedDatabase();
            });
        });
    }

    seedDatabase() {
        this.httpClient.get(
            'assets/database/db.sql',
            {responseType: 'text'}
        ).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data)
                .then(() => {
                    this.getLocations();
                    this.isDbReady.next(true);
                })
                .catch(error => console.error(error));
        });
    }

    dbState() {
        return this.isDbReady.asObservable();
    }

    // Get list
    async getLocations() {
        let res = null;

        await this.storage.executeSql('SELECT * FROM locations ORDER BY id DESC', []).then((results) => {
            res = results;
        });

        const items: any[] = [];

        if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
                if (res.rows.item(i).id !== 1) {
                    items.push({
                        id: res.rows.item(i).id,
                        lat: res.rows.item(i).lat,
                        lng: res.rows.item(i).lng,
                        time: res.rows.item(i).time
                    });
                }
            }
        }
        return items;

    }


    // Add
    addLocation(data) {
        return this.storage.executeSql('INSERT INTO locations (lat, lng, time) VALUES (?, ?, ?)', data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    async clearAllLocations() {
        try {
            return await this.storage.executeSql('DELETE FROM locations;', []).then(res => {
                console.log(res);
            });
        } catch (e) {
            return e;
        }
    }
}
