import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from './identity.service';


@Injectable({
  providedIn: 'root'
})
export class PermissionService implements CanActivate{

  constructor(private router: Router, private identityService: IdentityService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let identity = this.identityService.getUser();
    let role = this.identityService.getRole();
    return (!identity && role != "paciente") ? this.router.navigate(["/iniciar-sesion"]) : true;
  }

}
