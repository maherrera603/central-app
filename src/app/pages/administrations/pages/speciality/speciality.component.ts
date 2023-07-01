import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Speciality } from '@app/models/speciality';
import { IdentityService } from '@app/services/identity.service';
import { SpecialityService } from '@app/services/speciality.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
  providers: [IdentityService, SpecialityService]
})
export class SpecialityComponent implements OnInit, OnDestroy{
  private token!:string|null;
  private alertComponent!:AlertComponent;
  private suscription!:Subscription;
  protected specialitys!:Speciality[];
  protected specialit!:Speciality;
  protected action!:string;

  constructor(private identityService:IdentityService, private specialityService:SpecialityService){
    this.token = this.identityService.getToken();
    this.alertComponent = new AlertComponent();
    this.specialit = new Speciality("");
  }

  ngOnInit(): void {
    this.closeMenu();
    this.allSpecialities();
    this.suscription = this.specialityService.refresh.subscribe( () => this.allSpecialities() );
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

  protected searchSpeciality(search:string): void {
    if(search.length > 0){
      this.specialityService.searchSpeciality(this.token, search).subscribe(
        response => {
          (response.status == "OK")? this.specialitys = response.specialitys : this.alertComponent.error(response.message);
        }
      );
    }else{
      this.allSpecialities();
    }
  }

  protected openForm(action:string): void {
    let form = document.querySelector(".content-form");
    form?.classList.add("content-form-active");
    this.action = action;
    this.specialit = (this.action === "save") ? new Speciality(""): this.specialit;
  }

  protected closeForm(): void {
    let form = document.querySelector(".content-form");
    form?.classList.remove("content-form-active");
  }

  protected onSubmit(form:NgForm): void {
    (this.action == "save") ? this.saveSpeciality(form): this.updatedSpeciality();
  }

  private saveSpeciality(form:NgForm): void {
    this.specialityService.saveSpeciality(this.token, this.specialit).subscribe(
      response => {
        if (response.status == "created"){
          this.alertComponent.success(response.message);
          form.reset();
          this.closeForm();
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected allSpecialities(): void {
    this.specialityService.allSpecialities(this.token).subscribe(
      response => {
        (response.status == "OK") ? this.specialitys = response.specialitys: this.alertComponent.error(response.message);
      }
    );
  }

  protected getSpeciality(speciality:string): void{
    this.specialityService.getSpeciality(this.token, speciality).subscribe(
      response => {
        if(response.status == "OK"){
          this.specialit = response.speciality;
          this.openForm("update");
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected updatedSpeciality(): void {
    this.specialityService.updateSpeciality(this.token, this.specialit).subscribe(
      response => {
        (response.status === "created")? this.alertComponent.success(response.message) : this.alertComponent.error(response.message);
      }
    );
  }

  protected openOverlay(): void {
    let overlay = document.querySelector(".overlay");
    overlay?.classList.add("overlay-active");
  }

  protected closeOverlay(): void {
    let overlay = document.querySelector(".overlay");
    overlay?.classList.remove("overlay-active");
  }

  protected deleteSpeciality(speciality:string): void {
    this.specialityService.deleteSpeciality(this.token, speciality).subscribe(
      response => {
        if (response.status == "not content"){
          this.alertComponent.success(response.message);
          this.closeForm();
          this.closeOverlay();
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

}
