import { Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService implements CanActivate{

  constructor(private router: Router, private identityService: IdentityService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let identity = this.identityService.getUser();
    let role = this.identityService.getRole();
    return (!identity && role != "administrador") ? this.router.navigate(["/iniciar-sesion"]) : true;
  }
}
