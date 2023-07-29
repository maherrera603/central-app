import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { url } from './global';
import { Speciality } from '@app/models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  get refresh(){
    return this._refresh$;
  }

  public allSpecialities(token:string|null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `${token}`);
    return this.http.get(`${url}specialitys/`, {headers:headers})
  }

  public saveSpeciality(token:string|null, speciality:Speciality): Observable<any> {
    let params = JSON.stringify(speciality);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}specialitys/`, params, {headers:headers}).pipe(
      tap( () => this._refresh$.next() )
    );
  }

  public getSpeciality(token:string|null, pk:number): Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}speciality/${pk}/`, {headers:headers})
  }

  public updateSpeciality(token:string|null, speciality:Speciality): Observable<any> {
    let params = JSON.stringify(speciality);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("content-type", "application/json");
    return this.http.put(`${url}speciality/${speciality.id}/`, params, {headers:headers}).pipe(
      tap ( () => this._refresh$.next() )
    );
  }

  public deleteSpeciality(token:string|null, pk:number): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.delete(`${url}speciality/${pk}/`, {headers:headers}).pipe(
      tap( () => this._refresh$.next() )
    );
  }

  public searchSpeciality(token:string|null, speciality:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}specialitys/search/${speciality}/`, {headers:headers});
  }
}
