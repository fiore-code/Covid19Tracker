import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Analytics",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-bar-32",
    class: ""
  },
  {
    path: "/icons",
    title: "Timeline",
    rtlTitle: "الرموز",
    icon: "icon-compass-05",
    class: ""
  },
  {
    path: "/maps",
    title: "Hotspot Tracker",
    rtlTitle: "خرائط",
    icon: "icon-pin",
    class: ""
  },
  {
    path: "/notifications",
    title: "Resources",
    rtlTitle: "إخطارات",
    icon: "icon-attach-87",
    class: ""
  },
  {
    path: "/user",
    title: "About Us",
    rtlTitle: "إخطارات",
    icon: "icon-single-02",
    class: ""
  }
  
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
