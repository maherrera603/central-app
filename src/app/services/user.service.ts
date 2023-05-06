import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { url } from './global';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(`${url}login/`, params, {headers:headers});
  }
}
