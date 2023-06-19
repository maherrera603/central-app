import { Injectable } from '@angular/core';
import { desencryptAES, sha256 } from './global';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor() { }

  public getUser(){
    let user = sha256("user");
    let identity = sessionStorage.getItem(user);
    return (identity && identity != 'undefined' && desencryptAES(identity) !== "null") ? JSON.parse(desencryptAES(identity)) : null;
  }

  public getToken(){
    let tokenSha256 = sha256("token");
    let token = sessionStorage.getItem(tokenSha256);
    let descryptToken = desencryptAES(token);
    return (token && token != 'undefined') ? descryptToken : null;
  }

  public getRole(){
    let roleSha256 = sha256("role");
    let role:string | null = sessionStorage.getItem(roleSha256);
    let rol = desencryptAES(role);
    return (role && role != 'undefined') ? rol.toLowerCase() : null;
  }

}
