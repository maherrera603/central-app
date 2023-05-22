import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './global';
import { Cite } from '@app/models/cite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiteService {

  constructor(private http:HttpClient) {}

  public allCites(token:string|null){}

  public addCite(token:string|null, cite:Cite): Observable<any>{
    let params = JSON.stringify(cite);
    let headers = new HttpHeaders().set("Authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}cites/`, params, {headers:headers});
  }
}
