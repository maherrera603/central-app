import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from './global';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { Employee } from '@app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  get refresh(){
    return this._refresh$;
  }

  public allEmployees(token:string|null) : Observable<any>{
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}employee-register/`, {headers:headers});
  }

  public getEmployees(token:string|null, document:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}profile/${document}/` ,{headers:headers})
  }

  public saveEmployee(token:string|null, employee:Employee): Observable<any> {
    let params =  JSON.stringify(employee);
    let headers = new HttpHeaders().set("authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.post(`${url}employee-register/`, params, {headers:headers}).pipe(
      tap(() => this._refresh$.next())
    );
  }

  public updateEmployee(token:string|null, employee: Employee): Observable<any> {
    let params = JSON.stringify(employee);
    let headers = new HttpHeaders().set("Authorization", `Token ${token}`).set("Content-Type", "application/json");
    return this.http.put(`${url}profile/${employee.document}/`, params, {headers:headers}).pipe(
      tap(() => this._refresh$.next())
    );
  }

  public deleteEmployee(token:string |null, document:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.delete(`${url}employee-delete/${document}/`, {headers:headers}).pipe(
      tap( () => this._refresh$.next())
    );
  }

  public searchEmployee(token:string|null, search:string): Observable<any> {
    let headers = new HttpHeaders().set("authorization", `Token ${token}`);
    return this.http.get(`${url}employee/search/${search}/`, {headers:headers});
  }

}
