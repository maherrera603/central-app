import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { User } from '@app/models/User';
import { Employee } from '@app/models/employee';
import { EmployeeService } from '@app/services/employee-service.service';
import { IdentityService } from '@app/services/identity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [IdentityService, EmployeeService]
})
export class EmployeeComponent implements OnInit, OnDestroy{
  private token!:string|null;
  private alertComponent!:AlertComponent;
  private suscription!:Subscription;
  protected user:User = new User("","");
  protected employees!:Employee[];
  protected employee!:Employee;

  constructor(private identityService:IdentityService, private employeeService:EmployeeService){
    this.token = this.identityService.getToken();
    this.alertComponent = new AlertComponent();
    this.employee = new Employee("", "", "", "", "", this.user);
  }

  ngOnInit(): void {
    this.closeMenu();
    this.allEmployees();
    this.suscription = this.employeeService.refresh.subscribe( () => this.allEmployees());
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe();
  }

  private closeMenu(): void {
    let menu = document.querySelector(".navigation-user");
    menu?.classList.remove("navigation-user-active");
    let arrow_bottom = document.querySelector('.fa-sharp.fa-solid.fa-caret-right');
    arrow_bottom?.classList.remove("arrow-rigth");
  }

  private allEmployees(): void {
    this.employeeService.allEmployees(this.token).subscribe(
      response =>{
        if(response.status == "OK"){
          this.employees = response.employees;
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected openForm(): void {
    this.employee = new Employee("", "", "", "", "", this.user);
    let content = document.querySelector(".content-form");
    content?.classList.add("content-form-active");
  }

  protected closeForm(): void {
    let content = document.querySelector(".content-form");
    content?.classList.remove("content-form-active");
  }

  protected onSubmit(form:NgForm): void {
    this.saveEmployee(form);
  }

  private saveEmployee(form:NgForm): void {
    this.employeeService.saveEmployee(this.token, this.employee).subscribe(
      response => {
        if (response.status == "created"){
          form.reset();
          this.closeForm();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected getEmployee(document:string){
    this.employeeService.getEmployees(this.token, document).subscribe(
      response => {
        if(response.status == "OK"){
          this. employee = response.employee;
          this.openFormDelete();
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected openFormDelete(): void {
    let form = document.querySelector(".content-form-delete");
    form?.classList.add("content-form-active");
  }

  protected closeFormDelete(): void {
    let form = document.querySelector(".content-form-delete");
    form?.classList.remove("content-form-active");
  }

  protected openOverlay(): void {
    this.closeFormDelete();
    let overlay = document.querySelector(".overlay");
    overlay?.classList.add("overlay-active")
  }

  protected closeOverlay(): void {
    let overlay = document.querySelector(".overlay");
    overlay?.classList.remove("overlay-active")
  }

  protected deleteEmployee(document:string) :void {
    this.employeeService.deleteEmployee(this.token, document).subscribe(
      response => {
        if(response.status == "not content"){
          this.closeOverlay();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected searchEmployee(search:string): void {
    if(search.length > 0) {
      this.employeeService.searchEmployee(this.token, search).subscribe(
        response => {
          if (response.status == "OK"){
            this.employees =response.employees;
          }else{
            this.alertComponent.error(response.message)
          }
        }
      );
    }else{
      this.allEmployees();
    }
  }

}
