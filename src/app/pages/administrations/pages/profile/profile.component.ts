import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '@app/models/employee';
import { IdentityService } from '@app/services/identity.service';
import { EmployeeService } from '@app/services/employee-service.service';
import { AlertComponent } from '@app/components/alert/alert.component';
import { enctrypAES, sha256 } from '@app/services/global';
import { User } from '@app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [IdentityService, EmployeeService]
})
export class ProfileComponent implements OnInit {
  private identity:any;
  private token:string|null;
  private alertComponent!:AlertComponent;
  private user!:User;
  protected admin:Employee;

  constructor(private identityService:IdentityService, private employeeService:EmployeeService){
    this.admin =  new Employee("", "", "", "", "", this.user);
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
    let arrow_bottom = document.querySelector('.fa-sharp.fa-solid.fa-caret-right');
    arrow_bottom?.classList.remove("arrow-rigth");
  }

  private loadProfile(): void {
    this.employeeService.getEmployees(this.token, this.identity.document).subscribe(
      response => {
        if(response.status == "OK" ){
          this.admin = response.employee;
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
          sessionStorage.setItem(sha256("user"), enctrypAES(JSON.stringify(response.admin)));
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }
}
