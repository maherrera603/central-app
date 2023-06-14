import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './global';
import { Speciality } from '@app/models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http:HttpClient) { }

  public allSpecialities(token:string|null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `${token}`);
    return this.http.get(`${url}specialitys/`, {headers:headers})
  }

  public saveSpeciality(token:string|null, speciality:Speciality): Observable<any> {
    let params = JSON.stringify(speciality);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}specialitys/`, params, {headers:headers});
  }

  public getSpeciality(token:string|null, speciality:string): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}speciality/${speciality}/`, {headers:headers})
  }

  public updateSpeciality(token:string|null, speciality:Speciality): Observable<any> {
    let params = JSON.stringify(speciality);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("content-type", "application/json");
    return this.http.put(`${url}speciality/${speciality.speciality}/`, params, {headers:headers});
  }

  public deleteSpeciality(token:string|null, speciality:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.delete(`${url}speciality/${speciality}/`, {headers:headers});
  }

  public searchSpeciality(token:string|null, speciality:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}specialitys/search/${speciality}/`, {headers:headers});
  }
}
