import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { User } from '@app/models/User';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';
import { enctrypAES, sha256 } from '@app/services/global';

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
    this.removeNavigation();
  }

  private deleteCssIndex(): void {
    const header = document.querySelector("header");
    header?.classList.remove("index");
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-active");
    navigation?.classList.remove("navigation-active");
  }

  protected onSubmit(form: NgForm) {
    this.userService.login(this.user).subscribe(
      response => {
        if (response.status === "bad request"){
          this.user.password = "";
          this.alert.error(response.message);
        }else{
          this.loadSessionStorage(response);
          this.loadRole(response.role);
        }
      }
    );
  }

  private loadSessionStorage(response:any) {
    let token:string = sha256("token");
    let user:string = sha256("user");
    let role:string = sha256("role");

    sessionStorage.setItem(token, enctrypAES(response.token));
    sessionStorage.setItem(user, enctrypAES(JSON.stringify(response.user)));
    sessionStorage.setItem(role, enctrypAES(response.role));
  }

  private loadRole(role:string) : void{
    let roleLowerCase = role.toLowerCase();
    switch(roleLowerCase){
      case "administrador":
        this.router.navigate(["administrador"]);
        break;
      case "empleado":
        this.router.navigate(["gestion"]);
        break
      case "paciente":
        this.router.navigate(["sistema"])
        break;
    }
  }


}
