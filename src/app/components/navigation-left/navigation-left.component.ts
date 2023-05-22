import { ConstantPool } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-left',
  templateUrl: './navigation-left.component.html',
  styleUrls: ['./navigation-left.component.scss']
})
export class NavigationLeftComponent implements OnInit {
  @Input() page!:string;

  constructor(private router: Router){
  }

  ngOnInit(): void {
    this.showNavbar();
  }

  private showNavbar(): void {
    let menu =  document.querySelector("#menu");
    let navbar = document.querySelector("nav");
    let visible = false;

    menu?.addEventListener("click", () => {
      if (!visible) {
        navbar?.classList.add("active");
      }else{
        navbar?.classList.remove("active");
      }
      visible = !visible;
    })
  }
  protected principal () :void {
    this.router.navigate(["sistema"]);
  }

  protected familys () :void {
    this.router.navigate(["sistema/familiares"]);
  }

  protected cites () :void {
    this.router.navigate(["sistema/citas"]);
  }


}
