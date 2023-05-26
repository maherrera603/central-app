import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './global';
import { Cite } from '@app/models/cite';


@Injectable({
  providedIn: 'root'
})
export class CiteService {

  constructor(private http:HttpClient) {}

  public allCites(token:string|null): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cites/`, {headers:headers});
  }

  public addCite(token:string|null, cite:Cite): Observable<any>{
    let params = JSON.stringify(cite);
    let headers = new HttpHeaders().set("Authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}cites/`, params, {headers:headers});
  }

  public getCite(token:string | null, idCite:number): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cite/${idCite}/`, {headers:headers});
  }

  public getSearchCites(token:string| null, search:string): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cite/search/${search}/`, {headers:headers});
  }
}
