import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
//
import { IdentityService } from './identity.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotpermissionService implements CanActivate{

  constructor(private router: Router, private identityService: IdentityService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let identity = this.identityService.getUser();
    let role:string | null = this.identityService.getRole();
    let router = this.urlRole(role);
    return (identity && role) ? this.router.navigate([`/${router}`]): true;
  }

  private urlRole(role:string|null) : string{
    return (role === "paciente") ? "sistema" : (role == "administrador") ? "adminstrador":  "iniciar-sesion";
  }

}
