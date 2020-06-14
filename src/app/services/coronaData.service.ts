import { Injectable, ReflectiveInjector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CoronaDataService {
    public lat: any;
    public lng: any;
    public startLat: any;
    public startLong: any;
    public endLat: any;
    public endLong: any;

    constructor(private http: HttpClient) { }

    getCoronaData(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/get_daily_count');
    }
    // getHelloWordData():Observable<Object>{
    //     return this.http.get('https://3.6.39.146/');
    // }
    getAgeCategoryCount(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/age_count_data');
    }
    getStateWiseData(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/daily_state_count');
    }
    getWeeklyData(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/weekly_count');
    }
    getDistrictData(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/state_data');
    }
    getTrackingData(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/tracking_data');
    }

    getResources(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/covid_resources');
    }

    getDailyCount(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/daily_total_updates');
    }
    GetLocationCoordinates(lat, long) {
        this.lat = lat;
        this.lng = long;
    }

    getLocationCoordinatesMapbox(startLat, startLong, endLat, endLong) {
        this.startLat = startLat;
        this.startLong = startLong;
        this.endLat = endLat;
        this.endLong = endLong;
    }
    getRouteMapbox():Observable<Object>
    {
        return this.http.get('https://api.mapbox.com/directions/v5/mapbox/cycling/' + this.startLong + ',' + this.startLat + ';' + this.endLong + ',' + this.endLat + '?steps=true&geometries=geojson&access_token=pk.eyJ1Ijoic3ViaGFtLWZpb3JlIiwiYSI6ImNrOHl2Y3NkNDBsbm4zbHRhaGR6bndtNHgifQ.ljcjEqww1G0IHITR4MesbQ' )
    }
    getNearestLocation(): Observable<Object> {
        return this.http.get('https://thecampfire.in/api/getLocation/' + this.lat + '/' + this.lng);
    }
}

