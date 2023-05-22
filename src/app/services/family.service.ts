import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Family } from '@app/models/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient) { }

  public allFamily(token:string|null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}family/`, {headers: headers});
  }

  public getFamily(document:string, token:string|null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}family/${document}/`, {headers:headers});
  }

  public searchFamily(token:string|null, search:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}family/search/${search}/`, {headers:headers});
  }

  public addFamily(family:Family, token:string|null):Observable<any> {
    let params = JSON.stringify(family);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}family/`, params, {headers: headers});
  }

  public updateFamily(family:Family, token:string|null):Observable<any> {
    let params = JSON.stringify(family);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.put(`${url}family/${family.document}/`, params, {headers: headers});
  }

  public deleteFamily(token:string|null, document:string):Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.delete(`${url}family/${document}/`, {headers: headers});
  }
}
