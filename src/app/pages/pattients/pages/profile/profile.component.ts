import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Pattient } from '@app/models/Pattient';
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
  }

  private getPattient(){
    this.pattientService.getPattient(this.token, this.pattient.document).subscribe(
      response => {
        if(response.status === "OK"){
          this.pattient = response.pattient;
        }else{
          this.alert.error(response.message);
        }
      }
    );
  }

  protected onSubmit(form:NgForm): void {
    this.pattientService.updatePattient(this.pattient, this.token).subscribe(
      response => {
        if (response.status === "created"){
          sessionStorage.setItem("user", JSON.stringify(response.pattient));
          this.alert.success(response.message);
        }else{
          this.alert.error(response.message);
        }
      }
    );
  }

}
