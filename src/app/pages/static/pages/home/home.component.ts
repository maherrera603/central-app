import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    this.loadCss();
    this.removeNavigation();
  }

  private loadCss(): void {
    const cssClass = document.querySelector("header");
    cssClass?.classList.add("index");
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-active");
    navigation?.classList.remove("navigation-active");
  }

}
