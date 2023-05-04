import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  protected loadNav:boolean = false;

  constructor(){
  }

  ngOnInit(): void {
  }

  protected menuResponsive(){
    this.loadNav = !this.loadNav;
  }


}
