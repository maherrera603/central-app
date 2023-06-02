import { ConstantPool } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '@app/services/identity.service';

@Component({
  selector: 'app-navigation-left',
  templateUrl: './navigation-left.component.html',
  styleUrls: ['./navigation-left.component.scss'],
  providers: [IdentityService]
})
export class NavigationLeftComponent implements OnInit {
  protected role!:string | null;

  constructor(private router: Router, private identityService: IdentityService){
  }

  ngOnInit(): void {
    this.showNavbar();
    this.role = this.identityService.getRole();
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
  protected principal (): void {
    this.router.navigate(["sistema"]);
  }

  protected familys (): void {
    this.router.navigate(["sistema/familiares"]);
  }

  protected solicituds (): void {
    this.router.navigate(["sistema/solicitudes"]);
  }

  protected cites (): void {
    this.router.navigate(["sistema/citas"]);
  }

  protected principalAdministrador(): void {
    this.router.navigate(["administrador"]);
  }

  protected employees(): void {
    this.router.navigate(["administrador/empleados"]);
  }

}
