import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '@app/models/employee';
import { IdentityService } from '@app/services/identity.service';
import { EmployeeService } from '@app/services/employee-service.service';
import { AlertComponent } from '@app/components/alert/alert.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [IdentityService, EmployeeService]
})
export class ProfileComponent implements OnInit {
  protected admin:Employee;
  private identity:any;
  private token:string|null;
  private alertComponent!:AlertComponent;

  constructor(private identityService:IdentityService, private employeeService:EmployeeService){
    this.admin =  new Employee("", "", "", "", "", "", "")
    this.token = this.identityService.getToken();
    this.identity = this.identityService.getUser();
    this.alertComponent = new AlertComponent();
  }

  ngOnInit(): void {
    this.closeMenu();
    this.loadProfile();
  }

  private closeMenu():void{
    let menu = document.querySelector(".navigation-user-active");
    menu?.classList.remove("navigation-user-active");
  }

  private loadProfile(): void {
    this.employeeService.getEmployees(this.token, this.identity.document).subscribe(
      response => {
        if(response.status == "OK" ){
          this.admin = response.administrator;
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected onSubmit(form:NgForm): void {
    this.employeeService.updateEmployee(this.token, this.admin).subscribe(
      response => {
        if(response.status == "created"){
          this.alertComponent.success(response.message);
          this.identity.name = this.admin.name;
          this.identity.lastname = this.admin.lastname;
          this.identity.phone = this.admin.phone;
          sessionStorage.setItem("user", JSON.stringify(this.identity));
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }
}
