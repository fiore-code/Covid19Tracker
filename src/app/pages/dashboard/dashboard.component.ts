import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef, Input, NgModuleRef, HostListener } from "@angular/core";
import Chart from 'chart.js';
import * as mapboxgl from 'mapbox-gl';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoronaDataService } from '../../services/coronaData.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { element } from 'protractor';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styles: [`#myBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
    font-size: 18px; /* Increase font size */
}`
  ]
})
export class DashboardComponent implements OnInit {
  closeResult = '';
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';
  lat = 22.350075806124867;
  lng = 77.9150390625;
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public clicked3: boolean = false;
  public coronadata: any;
  public tested: any = "20233";
  public AgeCategoryData: any;
  public AgeCategoryInt: any;
  public StateData: any;
  public StateDataTable: any;
  public StateCodeData: any;
  public StateDataTableObject: any;
  public refreshItemValue: any;
  // public StateDataActive: string[];
  // public StateDataRecovered: string[] = [];
  // public StateDataDeceased: string[] = [];
  public StateKeyData: any;
  public list: string[] = [];
  public list1: string[] = [];
  public list2: string[] = [];
  public list3: string[] = [];
  public list4: string[] = [];
  public list5: string[] = [];
  public list6: string[] = [];
  public list7: string[] = [];
  public list8: string[] = [];
  public list9: string[] = [];
  public list10: string[] = [];
  //List Requirment
  public DailyCount: any;
  public list11: string[] = [];
  public list12: string[] = [];
  public list13: string[] = [];
  public list14: string[] = [];
  public WeeklyData: any;
  public WeeklyData2: any;
  public districtData: any;
  public districtDataTable: any;
  public districtDataTableModal: any;
  public locationData: any;

  //public len:any;
  public stateObj: any;
  public traildata: any;
  constructor(private coronadataservice: CoronaDataService, private modalService: NgbModal) { }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
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

  openXl(content, state) {
    //console.log(state);
    this.coronadataservice.getDistrictData().subscribe(data => {
      this.districtData = data;
      //this.districtDataTable=this.districtData.values();
      this.districtData.forEach((element) => {
        if (element.state == state) {
          this.districtDataTable = (element["districtData"]);
          const modelref = this.modalService.open(content, { size: 'xl' });
          //this.districtDataTableModal.patchValue(this.districtDataTable);
          modelref.componentInstance.districtDataTable = this.districtDataTable;
        }
      });
    });
    //const modelref = this.modalService.open(content, { size: 'xl' });
    //modelref.componentInstance.
  }

  //get location

  ngOnInit() {
    console.log(localStorage.getItem("refresh2"));
    this.refreshItemValue = localStorage.getItem("refresh2");
    if (this.refreshItemValue == "1" || this.refreshItemValue == null) {
      localStorage.setItem("refresh2", "2");
      window.location.reload();
    }
    else {
      localStorage.setItem("refresh2", "1");
    }
    //fetch data
    //debugger;
    // this.coronadataservice.getHelloWordData().subscribe(data => {
    //   this.HelloWorldData = data;
    //   debugger;
    // });

    // this.coronadataservice.getAgeCategoryCount().subscribe((data) => {
    //   this.traildata = data;
    // });


    this.coronadataservice.getCoronaData().subscribe((data) => {
      this.coronadata = data;
    });



    //Fetch AgeCategroy Count
    this.coronadataservice.getAgeCategoryCount().subscribe((dataAge) => {
      this.AgeCategoryData = dataAge;
      this.AgeCategoryInt = [parseInt(this.AgeCategoryData.Category1), parseInt(this.AgeCategoryData.Category2), parseInt(this.AgeCategoryData.Category3), parseInt(this.AgeCategoryData.Category4), parseInt(this.AgeCategoryData.Category5)];
      this.canvas = document.getElementById("chartLineRed");
      this.ctx = this.canvas.getContext("2d");

      var data = {
        labels: ['1-10', '10-25', '25-50', '50-70', 'ABOVE 70'],
        datasets: [{
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.AgeCategoryInt,
        }]
      };

      var myChart = new Chart(this.ctx, {
        type: 'bar',
        data: data,
        options: gradientBarChartConfiguration
      });
    });


    this.coronadataservice.getStateWiseData().subscribe((StateData) => {
      this.StateData = StateData;
      this.StateKeyData = Object.keys(this.StateData);
      this.stateObj = Object.values(this.StateData)[36];



      this.StateData.forEach(element => {
        if (element[0] != "Total") {
          this.list.push(element[1].state);
          this.list1.push(element[1].active);
          this.list2.push(element[1].recovered);
          this.list3.push(element[1].deaths);
          this.list7.push(element[1].Tested);
        }
        //console.log("anything");

      });


      //Red Chart
      var chart_labels = this.list;
      this.datasets = [
        this.list1,
        this.list2,
        this.list3,
        this.list7
      ];
      this.data = this.datasets[0];



      this.canvas = document.getElementById("chartBig1");
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      var config = {
        type: 'line',
        data: {
          labels: chart_labels,
          datasets: [{
            label: "Statewise",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }]
        },
        options: gradientChartOptionsConfigurationWithTooltipBlue
      };
      this.myChartData = new Chart(this.ctx, config);
    });

    this.coronadataservice.getWeeklyData().subscribe(data => {
      this.WeeklyData = data;

      this.WeeklyData.forEach(element => {
        this.list4.push(element.Date);
        this.list5.push(element.Confirmed);
      });

      this.canvas = document.getElementById("CountryChart");
      this.ctx = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


      var myChart = new Chart(this.ctx, {
        type: 'bar',
        responsive: true,
        legend: {
          display: false
        },
        data: {
          labels: this.list4,
          datasets: [{
            label: "Confirmed",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: this.list5,
          }]
        },
        options: gradientBarChartConfigurationAnother
      });
    });

    this.coronadataservice.getDailyCount().subscribe(data => {
      this.DailyCount = data;
      this.DailyCount.forEach(element => {
        this.list11.push(element[0]);//date
        this.list12.push(element[1]);//confirmed
        this.list13.push(element[2]);//deaths
        this.list14.push(element[3]);//recovered
      });

      //ChartLineDaily

      this.canvas = document.getElementById("chartLineDaily");
      this.ctx = this.canvas.getContext("2d");


      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors


      var gradientStroke2 = this.ctx.createLinearGradient(255, 0, 51, 50);

      gradientStroke2.addColorStop(1, 'rgba(134, 66, 80,0.15)');
      gradientStroke2.addColorStop(0.4, 'rgba(134, 66, 85,0.0)'); //red colors
      gradientStroke2.addColorStop(0, 'rgba(134, 66, 91,0)');

      var gradientStroke3 = this.ctx.createLinearGradient(255, 0, 251, 50);

      gradientStroke3.addColorStop(1, 'rgba(129, 66, 134,0.15)');
      gradientStroke3.addColorStop(0.4, 'rgba(122, 66, 134,0.0)'); //red colors
      gradientStroke3.addColorStop(0, 'rgba(127, 66, 134,0)');

      var data1 = {
        labels: this.list11,
        datasets: [{
          label: "death",
          fill: true,
          backgroundColor: gradientStroke2,
          borderColor: '#ad0017',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ad0017',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.list13,
        }, {
          label: "Confirmed",
          fill: true,
          backgroundColor: gradientStroke3,
          borderColor: '#e502f5',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#e502f5',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.list12,
        },
        {
          label: "Recovered",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.list14,
        }]
      };


      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data1,
        options: gradientChartOptionsConfigurationWithTooltipGreen

      });


    });

    this.coronadataservice.getWeeklyData().subscribe(data => {
      this.WeeklyData2 = data;

      this.WeeklyData2.forEach(element => {
        this.list8.push(element.Date);//list9 is a date list
        this.list9.push(element.Recovered);//list9 is a recovered list
        this.list10.push(element.Death);//list 10 is a death list
      });

      this.canvas = document.getElementById("chartLineGreen");
      this.ctx = this.canvas.getContext("2d");


      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors


      var gradientStroke2 = this.ctx.createLinearGradient(255, 0, 51, 50);

      gradientStroke2.addColorStop(1, 'rgba(134, 66, 80,0.15)');
      gradientStroke2.addColorStop(0.4, 'rgba(134, 66, 85,0.0)'); //red colors
      gradientStroke2.addColorStop(0, 'rgba(134, 66, 91,0)');

      var data1 = {
        labels: this.list8,
        datasets: [{
          label: "death",
          fill: true,
          backgroundColor: gradientStroke2,
          borderColor: '#ad0017',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ad0017',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.list10,
        },
        {
          label: "Recovered",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.list9,
        }]
      };


      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data1,
        options: gradientChartOptionsConfigurationWithTooltipGreen

      });




    });
    //For Table Data
    this.coronadataservice.getStateWiseData().subscribe((data) => {
      this.StateDataTable = data;
      this.StateDataTableObject = Object.values(this.StateDataTable);
    });

    //MapBox API
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox2.accessToken);
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 3
    });


    map.on('load', function () {
      //   map.addSource('pointsOrange', {
      //     'type': 'geojson',
      //     'data':
      //   });
      //   //Point source orange
      //   map.addLayer({
      //     'id': 'pointsOrange',
      //     'type': 'circle',
      //     'source': 'pointsOrange',
      //     'paint': {
      //       "circle-radius": 7,
      //       "circle-color": 'rgba(250, 151, 2,0.5)'
      //     }

      //   });


      map.addSource('points', {
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
                  77.6081085205078,
                  14.685896125376305
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "marker-color": "#7e7e7e",
                "marker-size": "medium",
                "marker-symbol": ""
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  83.30057144165039,
                  17.72563296884541
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.09263610839844,
                  13.221229745578954
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  80.94314575195312,
                  16.247638441537
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  81.63940429687499,
                  16.81505795923194
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  81.9140625,
                  17.177530993362268
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "marker-color": "#7e7e7e",
                "marker-size": "medium",
                "marker-symbol": ""
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.29519653320312,
                  15.921714751383167
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "marker-color": "#7e7e7e",
                "marker-size": "medium",
                "marker-symbol": ""
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.98802185058594,
                  14.453298590545614
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  80.45013427734375,
                  16.29773291178066
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.03863525390625,
                  15.847747106092061
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.76525115966797,
                  30.72324396094116
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  82.7215576171875,
                  22.35896640636645
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.29783058166504,
                  28.677071719150224
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.21122741699217,
                  28.541100228636036
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.97914123535156,
                  28.589345223446188
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.14668273925781,
                  28.791130513231842
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.99356079101562,
                  28.721302620660314
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.13706970214844,
                  28.634554808973057
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.29225158691406,
                  28.635760131498763
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.21946716308594,
                  28.618884356412234
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.5808334350586,
                  23.025079779673185
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73.2073974609375,
                  22.32467096613321
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.80158996582031,
                  21.19273469332693
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.13485717773438,
                  21.777354799786696
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "marker-color": "#7e7e7e",
                "marker-size": "medium",
                "marker-symbol": ""
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  70.8020782470703,
                  22.30624956395517
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.00248718261719,
                  28.10711481248363
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.02239990234375,
                  28.474727272604017
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.31147766113281,
                  28.404688769275165
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.32589721679688,
                  28.144054213786966
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.81346130371094,
                  34.07996230865873
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.63939666748047,
                  34.425319325189186
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.33624267578125,
                  34.2140734536726
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.849853515625,
                  32.72375394304274
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.15472412109375,
                  32.9257074887604
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.25933837890625,
                  34.546155870768295
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.58270263671875,
                  12.988500396985364
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.65573120117188,
                  12.3118274899455
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.50807571411133,
                  15.8588109588503
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.98855590820312,
                  12.504961924014806
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.37393569946289,
                  11.876842313593741
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.28623008728027,
                  9.989899098132653
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.07894897460938,
                  11.05207095967298
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.93313598632812,
                  8.5073470267949
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.78705215454102,
                  9.26698181368033
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.86128234863281,
                  22.724890471093413
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.39456176757812,
                  23.262795820239646
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.32256317138672,
                  23.10278634448921
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.77957153320312,
                  23.177607491244775
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.71659851074219,
                  22.747055625892813
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.83248901367188,
                  18.932918009930866
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73.85421752929688,
                  18.527794013553017
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.97187805175781,
                  19.200944173892672
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.08027648925781,
                  21.150474965190767
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.59510803222656,
                  16.853176767092155
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.739990234375,
                  19.10235058533833
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.13545227050781,
                  20.401271959729453
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.7509765625,
                  19.89072302399691
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.17713928222656,
                  20.53636335038095
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73.78761291503906,
                  20.012064721506345
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  85.23674011230469,
                  20.020129342898695
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.63066864013672,
                  30.761308948998106
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "marker-color": "#7e7e7e",
                "marker-size": "medium",
                "marker-symbol": ""
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.85372924804688,
                  31.21162694596725
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.574951171875,
                  31.33252503230784
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.64498901367188,
                  32.27552233695385
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.81596374511719,
                  26.922682144129073
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.78849792480469,
                  26.16591517661071
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73.02886962890625,
                  26.306957486827347
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.44473266601562,
                  23.55895191986295
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.85784912109375,
                  25.186301620540558
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.39505004882812,
                  28.134971934813155
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.63150024414062,
                  25.352093021352342
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  70.8673095703125,
                  26.936762457231424
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73.32000732421875,
                  28.040470623280083
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.16555213928223,
                  24.594504718596326
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.49618530273438,
                  27.219830526659933
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  80.27503967285155,
                  13.084828874547332
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.68751525878906,
                  10.809700766095014
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.95854187011719,
                  11.006578475278959
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.72964477539062,
                  11.331272817090133
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.68569946289062,
                  8.733756105406975
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.96928405761719,
                  10.36828306645027
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.49612617492676,
                  11.94302093780627
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.16635131835938,
                  11.226898356401609
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.4807357788086,
                  10.011791463450832
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.9866485595703,
                  12.684219745746148
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.34512329101562,
                  11.098230194986673
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.13246154785156,
                  12.91020598061841
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.12171936035156,
                  9.932329524023626
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.10420989990234,
                  8.80229683161557
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.07846069335938,
                  10.962090140718248
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.95486450195312,
                  9.585854983417578
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.54326343536377,
                  8.11474095276773
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.76554870605469,
                  11.759142440407805
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.63268280029297,
                  10.769904911987892
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "marker-color": "#7e7e7e",
                "marker-size": "medium",
                "marker-symbol": ""
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.15742492675781,
                  11.669720718159526
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.84107971191406,
                  10.76653214002123
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.46572875976561,
                  17.379473773227488
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.09974670410155,
                  18.678772221921143
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.60693359375,
                  17.997019435370373
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.79762268066406,
                  16.241705355475933
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.91297912597655,
                  17.359158397495296
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.13246154785156,
                  18.43987883590277
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.34899902343749,
                  19.093266636089712
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.0084228515625,
                  27.177690810425908
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.54974365234375,
                  28.48015935547218
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.70355224609375,
                  28.997330682627545
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  80.93559265136719,
                  26.841839424622044
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.41172790527344,
                  28.674925574564284
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.5360107421875,
                  29.969211659636663
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.30821609497069,
                  29.44961327012476
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.39569091796874,
                  27.158753290560814
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.75686645507812,
                  28.851890877683992
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  78.04550170898436,
                  30.342065246371636
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.35411071777344,
                  22.569633969613324
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.31565856933594,
                  22.588654394218803
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  87.38182067871094,
                  22.740723091194727
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  88.39668273925781,
                  22.621616907276728
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  92.63397216796875,
                  11.80014570857395
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  93.97705078125,
                  26.522192867724723
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  92.34463691711426,
                  26.251969803432967
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  91.42925262451172,
                  26.45950861170239
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  89.98532295227051,
                  26.019997179025633
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  86.47750854492188,
                  25.39614171131381
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  86.14517211914061,
                  25.434593620577097
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  85.00946044921875,
                  24.800448319788668
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  81.62979125976562,
                  21.249702161806947
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.11666107177734,
                  23.854756031401852
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.7669677734375,
                  30.38827651940287
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.98394775390625,
                  29.685666670118724
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.07389831542969,
                  30.94110220488552
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.27670288085938,
                  31.468496379205966
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.124267578125,
                  32.560703522325156
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.26502990722656,
                  32.10816944421472
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.82444763183594,
                  33.71862851510573
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.31358337402344,
                  33.37698574945272
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  85.32119750976562,
                  23.37377442204459
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  86.14585876464842,
                  23.65694640904091
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.157470703125,
                  12.78769634352248
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.52090454101562,
                  17.924516037040917
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.83494567871094,
                  17.33195848252145
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.69717407226562,
                  16.1929154227721
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.00778198242188,
                  15.45765111021037
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  76.08761787414551,
                  11.637188925944542
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.98576354980469,
                  26.498843904633983
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.23942565917969,
                  16.70986293320658
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.75917053222656,
                  20.936430557693942
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  72.76931762695312,
                  19.702718254501082
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  86.50360107421875,
                  21.06912308335471
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.40260314941406,
                  29.99657038669949
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  74.87594604492188,
                  31.638183183107035
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.85098266601562,
                  30.9187201197222
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  75.1739501953125,
                  30.829139422013956
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  73.68118286132812,
                  24.58459276519208
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.2718505859375,
                  17.063348925329638
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.85873413085938,
                  28.411936281507877
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  80.68016052246092,
                  27.56793880840749
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  81.09459400177002,
                  26.935767710210694
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  77.21328735351562,
                  28.946870564861495
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  79.45466995239258,
                  29.392944263140052
                ]
              }
            }
          ]
        }
      });
      map.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': 'points',
        'paint': {
          "circle-radius": 7,
          "circle-color": 'rgba(230, 14, 39,0.5)'
        }

      });
    });


    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };



    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 1000,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    var gradientBarChartConfigurationAnother: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 10000,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      } 
    };



    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors



  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  ngAfterViewInit(): void {
    // Permet de recharger la timeline twitter
    (<any>window).twttr.widgets.load();
  }
}
