import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { url } from './global';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { Doctor } from '@app/models/doctor';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  get refresh(): Subject<void>{
    return this._refresh$;
  }

  public allDoctors(token:string|null): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}doctors/`, {headers:headers})
  }

  public saveDoctor(token:string|null, doctor:Doctor): Observable<any> {
    let params = JSON.stringify(doctor);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}doctors/`, params, {headers:headers}).pipe(
      tap( () => this._refresh$.next())
    );
  }

  public getDoctor(token:string|null, document:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}doctor/${document}/`, {headers:headers});
  }

  public updateDoctor(token:string|null, doctor:Doctor): Observable<any> {
    let params = JSON.stringify(doctor);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("content-type", "application/json");
    return this.http.put(`${url}doctor/${doctor.document}/`, params, {headers:headers}).pipe(
      tap( () => this._refresh$.next())
    );
  }

  public deleteDoctor(token:string|null, document:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.delete(`${url}doctor/${document}/`, {headers:headers}).pipe(
      tap( () => this._refresh$.next())
    );
  }

  public searchDoctor(token:string|null, search:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}doctors/search/${search}/`, {headers:headers});
  }
}
