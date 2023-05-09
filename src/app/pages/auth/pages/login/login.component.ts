import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { User } from '@app/models/User';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {
  private alert!:AlertComponent;
  protected user!: User;

  constructor(private userService: UserService, private router: Router) {
    this.alert = new AlertComponent();
    this.user = new User("", "");
  }

  ngOnInit(): void {
    this.deleteCssIndex();
  }

  private deleteCssIndex(): void {
    const header = document.querySelector("header");
    header?.classList.remove("index");
  }

  protected onSubmit(form: NgForm) {
    this.userService.login(this.user).subscribe(
      response => {
        if (response.status === "bad request"){
          this.user.password = "";
          this.alert.error(response.message);
        }else{
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("user", JSON.stringify(response.user));
          this.loadRole(response.role);
        }
      }
    );
  }

  private loadRole(role:string) : void{
    switch(role){
      case "Administrador":
        this.alert.success("welcome administrador")
        break;
      case "Empleado":
        this.alert.success("welcome empleado!");
        break
      case "paciente":
        this.router.navigate(["sistema"])
        break;
    }
  }


}
