import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './global';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http:HttpClient) { }

  public allSpecialities(token:string|null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `${token}`);
    return this.http.get(`${url}specialitys/`, {headers:headers})
  }
}
