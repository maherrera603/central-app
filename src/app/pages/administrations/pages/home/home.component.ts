import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor() {

  }

  ngOnInit(): void {
    this.closeMenu();
  }

  private closeMenu(): void {
    let menu = document.querySelector(".navigation-user");
    menu?.classList.remove("navigation-user-active");
  }
}
