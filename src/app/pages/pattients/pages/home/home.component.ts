import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  protected navLeft: boolean = false;

  constructor(){}

  ngOnInit(): void {
  }

  protected showNavLeft(): void {
    this.navLeft = !this.navLeft;
  }

  protected changeNav ($event: boolean): void {
    this.navLeft = $event;
  }
}
