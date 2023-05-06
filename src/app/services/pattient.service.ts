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
    let params = JSON.stringify(pattient)
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(`${url}register/`, params, {headers:headers});
  }
}
