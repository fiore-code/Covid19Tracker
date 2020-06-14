import { Component, OnInit, HostListener } from "@angular/core";
import { CoronaDataService } from '../../services/coronaData.service';
//import { CsvService } from 'angular2-json2csv';
import { AppService } from '../../services/app.service';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html",
  styles: [`#myBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
    font-size: 18px; /* Increase font size */
}`]
})
export class IconsComponent implements OnInit {
  public trackingData: any;
  public state: string;
  pageStart = 0;
  pageEnd = 50;
  csvData: any;
  constructor(private coronadataservice: CoronaDataService, private appService: AppService) { }

  nextData() {
    this.pageStart += 50;
    this.pageEnd += 50;           // Get the next 100 records
  }

  prevData() {
    this.pageStart -= 50;
    this.pageEnd -= 50;        // Get the previous 100 records
  }
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

  ngOnInit() {

    this.coronadataservice.getTrackingData().subscribe(data => {
      //debugger;
      this.trackingData = data;
    });
  }

  Search() {
    if (this.state != "") {
      this.trackingData = this.trackingData.filter(res => {
        return res[2].toLocaleLowerCase().match(this.state.toLocaleLowerCase());
      });
    }
    else if (this.state == "") {
      this.ngOnInit();
    }
  }

  download(data) {
    this.appService.downloadFile(data, 'Tracking_Data');
  }

  ExportCsv() {

    this.coronadataservice.getTrackingData().subscribe(data => {
      //debugger;
      this.csvData = data;
      this.download(this.csvData);
    });
  }
}
