import { Component, OnInit, HostListener } from "@angular/core";
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { CoronaDataService } from '../../services/coronaData.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
  styles: [`#myBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
    font-size: 18px; /* Increase font size */
}
.borderless td, .borderless th {
  border: none;
}
.vertical { 
  border-left: 2px dotted white; 
  height: 60px; 
  position:relative; 
  left: 0; 
} `
  ]
})
export class MapComponent implements OnInit {
  public selectedName: any;
  public names = ["Mumbai", "Kolkata"];
  mapHotspot: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';
  lat = 22.350075806124867;
  lng = 77.9150390625;
  public zoom: any = 4
  public myDate = new Date();
  public isLocationProvided: boolean = false;
  public locationData: any;
  public citySelected: boolean = false;
  public nearestLocationData: any;
  public routeData: any;
  public selectedCity: any;
  public selectedState: any;
  public distance: any;
  public refresh: any;
  public refreshItemValue:any;
  constructor(private coronadataservice: CoronaDataService, private router: Router, private route: ActivatedRoute) {

  }

  //refresh function

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.locationData = data;
      console.log(this.locationData.coords.latitude);
      console.log(this.locationData.coords.longitude);
      console.log(this.locationData.coords.accuracy);
      this.isLocationProvided = true;
      this.coronadataservice.GetLocationCoordinates(this.locationData.coords.latitude, this.locationData.coords.longitude);
      this.coronadataservice.getNearestLocation().subscribe(data => {
        this.nearestLocationData = data;
        //debugger;
        this.mapHotspot.addSource('pointsMyLocation', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    this.locationData.coords.longitude,
                    this.locationData.coords.latitude
                  ]
                }
              }]
          }
        });
        this.mapHotspot.addLayer({
          'id': 'pointsMyLocation',
          'type': 'circle',
          'source': 'pointsMyLocation',
          'paint': {
            "circle-radius": 7,
            "circle-color": 'rgba(243, 255, 5,0.5)'
          }
        });
        this.mapHotspot.fitBounds([
          [this.locationData.coords.longitude, this.locationData.coords.latitude],
          [this.nearestLocationData.Longitude, this.nearestLocationData.Latitude]
        ]);
        this.getRoute();
      });
    });
  }

  getRoute() {
    this.coronadataservice.getLocationCoordinatesMapbox(this.locationData.coords.latitude, this.locationData.coords.longitude, this.nearestLocationData.Latitude, this.nearestLocationData.Longitude);
    this.coronadataservice.getRouteMapbox().subscribe(data => {
      this.routeData = data;
      //debugger;
      let dataOfRoutes = this.routeData.routes[0];
      let routes = dataOfRoutes.geometry.coordinates;
      //debugger;
      this.distance = (dataOfRoutes.legs[0].distance) / 1000;
      debugger;
      var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routes
        }
      };

      this.mapHotspot.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routes
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 3,
          'line-opacity': 0.75
        }
      });
    });
  }
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  centerLocation() {

    //debugger;
    this.citySelected = true;
    if (this.selectedName == "Kolkata") {
      this.selectedCity = "Kolkata";
      this.selectedState = "West Bengal";
      this.lat = 22.570530000000076;
      this.lng = 88.37124000000006;
      this.zoom = 12;
      this.mapHotspot.fitBounds([
        [88.3580988, 22.6421102],
        [88.3617653, 22.4335756]
      ]);


      this.mapHotspot.addSource('points', {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3472788,22.5229164
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.2770032,22.5361644
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3581385,22.5775647//uptill this
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3608331,22.5186013
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3612062,22.5779839
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3884029,22.4724453
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.2515124,22.5559563
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3707678,22.5951947
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3443003,22.524262
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3621466,22.5978466
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3569512,22.5849375
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3495194,22.5490271
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3623029,22.553069
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.2946433,22.5482398
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3384413,22.509425
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.346844,22.573908
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3532409,22.5195318
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3175351,22.526243
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3485186,22.5109569
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.356558,22.5383376
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3523922,22.5810886
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3675243,22.5550211
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3795482,22.5781012
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.4119067,22.4843381
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3327203,22.5160988
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3537805,22.5951119
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.343746,22.5266067
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.335353,22.5138337
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3874997,22.5570032
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3865152,22.6035708
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3670524,22.5650822
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.37009580803567, 22.575374834821442
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3594633,22.5808228
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3709253,22.5728841
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3538237,22.5834247
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3853003,22.5273175
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3195647,22.4772714
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3529612,22.5897145
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3510067,22.5376089
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3617797,22.5981713
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.2710341,22.5512556
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3932631,22.6036015
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3799723,22.5874122
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3752753,22.465635
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3585239,22.5943866
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3222583,22.5315121
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.373186,22.58606
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3719878,22.6186774
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3782318,22.5398829
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3703706,22.6221977
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.367939,22.5402243
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3226259,22.5343674
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  888.3737834,22.5801711
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3726568,22.5364291
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3577091,22.5901132
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3601347,22.5693816
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3880229,22.5710266
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.4237797,22.5814643
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.4069929,22.5946154
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.4097831,22.5775715
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3831566,22.594477
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3793737,22.6660466
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.4176173,22.6217817
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.3919179,22.621282
                ]
              }
            }
          ,{
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.820494,22.9130085
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.425559,22.6646397
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.434724509716,22.6615664263209
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.3735403,22.5869788
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.3543878,22.487417
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.3662742,22.5979763
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.3373698,22.48379
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.1464853,23.26543
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.4053458,22.608344
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                88.3593097,22.5820929
              ]
            }
          }]
        }
      });
      this.mapHotspot.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': 'points',
        'paint': {
          "circle-radius": 20,
          "circle-color": 'rgba(230, 14, 39,0.3)'
        }
      });
    }
    else if (this.selectedName == "Mumbai") {
      this.selectedCity = "Mumbai";
      this.selectedState = "Maharashtra";
      this.lat = 19.0760;
      this.lng = 72.8777;
      this.zoom = 12;
      this.mapHotspot.fitBounds([
        [72.7569335, 19.3783206],
        [72.9017701, 18.8799932]
      ]);
    }
  }

  ngOnInit() {
    //window.location.reload();
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    this.mapHotspot = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: this.zoom
    });
    var canvas = this.mapHotspot.getCanvasContainer();
    console.log(localStorage.getItem("refresh"));
    this.refreshItemValue=localStorage.getItem("refresh");
    if(this.refreshItemValue=="1" || this.refreshItemValue==null)
    {
      localStorage.setItem("refresh", "2");
      window.location.reload();
    }
    else{
    localStorage.setItem("refresh", "1");
    }
    
  }
}
