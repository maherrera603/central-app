import { Component, OnInit, DoCheck } from '@angular/core';
import { IdentityService } from '@app/services/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  protected loadNav:boolean = false;
  protected identityUser:any;
  protected role!:string|null;

  constructor(private identityService: IdentityService, private router: Router){
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.identityUser = this.identityService.getUser();
    this.role = this.identityService.getRole();
  }

  protected showNavigation () : void {
    let navigation = document.querySelector('.navigation');
    let navigation_active = document.querySelector(".navigation-active");
    if (navigation_active == null) {
      navigation?.classList.add("navigation-active");
    }else{
      navigation?.classList.remove("navigation-active");
    }
  }

  protected showNavigationUser () : void {
    let navigation = document.querySelector('.navigation-user');
    let navigation_active = document.querySelector(".navigation-user-active");
    let arrow_bottom = document.querySelector('.fa-sharp.fa-solid.fa-caret-right');
    if (navigation_active == null) {
      navigation?.classList.add("navigation-user-active");
      arrow_bottom?.classList.add("arrow-rigth");
    }else{
      navigation?.classList.remove("navigation-user-active");
      arrow_bottom?.classList.remove("arrow-rigth");
    }
  }

  protected logout(): void{
    sessionStorage.clear();
    this.router.navigate(['/iniciar-sesion']);
  }
}
