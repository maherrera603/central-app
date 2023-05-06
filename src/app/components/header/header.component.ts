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

  constructor(private identityService: IdentityService, private router: Router){
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.identityUser = this.identityService.getUser();
  }

  protected menuResponsive(){
    this.loadNav = !this.loadNav;
  }

  protected logout(): void{
    sessionStorage.clear();
    this.menuResponsive();
    this.router.navigate(['/iniciar-sesion']);
  }




}
