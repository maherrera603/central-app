import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { url } from './global';
import { Cite } from '@app/models/cite';


@Injectable({
  providedIn: 'root'
})
export class CiteService {
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  get refresh$(){
    return this._refresh$;
  }

  public allCites(token:string|null): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cites/`, {headers:headers}).pipe(tap ( () => this._refresh$.next));
  }

  public addCite(token:string|null, cite:Cite): Observable<any>{
    let params = JSON.stringify(cite);
    let headers = new HttpHeaders().set("Authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}cites/`, params, {headers:headers}).pipe(
      tap( () => this.refresh$.next())
    );
  }

  public getCite(token:string | null, idCite:number): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cite/${idCite}/`, {headers:headers});
  }

  public getSearchCites(token:string| null, search:string): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cite/search/${search}/`, {headers:headers});
  }

  public deleteCite(token:string|null, idCite:number): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.delete(`${url}cite/${idCite}/`, {headers: headers}).pipe(
      tap( () => this.refresh$.next() )
    );
  }

  public allCitesForEmployees(token:string| null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}allCites/`, {headers:headers});
  }

  public searchCites(token:string| null, search:string): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}cites/search/${search}/`, {headers:headers});
  }

  public getCiteForEmployee(token:string | null, idCite:number): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}citeForEmployee/${idCite}/`, {headers:headers});
  }

  public putCiteForEmployee(token:string|null, cite:Cite): Observable<any>{
    let params = JSON.stringify(cite);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("content-type", "application/json");
    return this.http.put(`${url}citeForEmployee/${cite.id}/`, params, {headers:headers}).pipe(
      tap( () => this.refresh$.next())
    );
  }
}
