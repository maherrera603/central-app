import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Pattient } from '@app/models/Pattient';
import { enctrypAES, sha256 } from '@app/services/global';
import { IdentityService } from '@app/services/identity.service';
import { PattientService } from '@app/services/pattient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [IdentityService, PattientService]
})
export class ProfileComponent implements OnInit {
  protected pattient!: Pattient;
  private token!:string | null;
  private alert!:AlertComponent;

  constructor(private identityService: IdentityService, private pattientService:PattientService){
    this.pattient = this.identityService.getUser();
    this.token = this.identityService.getToken();
    this.alert = new AlertComponent();
  }

  ngOnInit(): void {
    this.getPattient();
    this.removeNavigation();
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-user-active");
    navigation?.classList.remove("navigation-user-active");
    let arrow_bottom = document.querySelector('.fa-sharp.fa-solid.fa-caret-right');
    arrow_bottom?.classList.remove("arrow-rigth");
  }

  private getPattient(){
    this.pattientService.getPattient(this.token, this.pattient.document).subscribe(
      response => {
        (response.status === "OK") ? this.pattient = response.pattient : this.alert.error(response.message);  
      }
    );
  }

  protected onSubmit(form:NgForm): void {
    this.pattientService.updatePattient(this.pattient, this.token).subscribe(
      response => {
        if (response.status === "created"){
          sessionStorage.setItem(sha256("user"), enctrypAES(JSON.stringify(response.pattient)));
          this.alert.success(response.message);
        }else{
          this.alert.error(response.message);
        }
      }
    );
  }

}
