import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor() { }

  public getUser(){
    let identity = sessionStorage.getItem('user');
    return (identity && identity != 'undefined') ? JSON.parse(identity) : null;
  }

  public getToken(){
    let token = sessionStorage.getItem('token');
    return (token && token != 'undefined') ? token : null;
  }

  public getRole(){
    let role:string | null = sessionStorage.getItem('role');
    return (role && role != 'undefined') ? role.toLowerCase() : null;
  }

}
