import { Injectable } from '@angular/core';
import { Pattient } from '@app/models/Pattient';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { url } from './global';


@Injectable({
  providedIn: 'root'
})
export class PattientService {

  constructor(private http:HttpClient) { }

  public registerPattient(pattient: Pattient): Observable<any>{
    let params = JSON.stringify(pattient);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(`${url}register/`, params, {headers:headers});
  }

  public getPattient(token:string|null, document:string): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}pattient/${document}/`, {headers:headers});
  }

  public updatePattient(pattient:Pattient, token:string|null): Observable<any>{
    let params = JSON.stringify(pattient);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.put(`${url}pattient/${pattient.document}/`, params, {headers: headers});
  }

}
