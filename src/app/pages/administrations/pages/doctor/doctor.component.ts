import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Doctor } from '@app/models/doctor';
import { Speciality } from '@app/models/speciality';
import { DoctorService } from '@app/services/doctor.service';
import { IdentityService } from '@app/services/identity.service';
import { SpecialityService } from '@app/services/speciality.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  providers: [IdentityService, DoctorService, SpecialityService]
})
export class DoctorComponent implements OnInit {
  private token!:string|null;
  private identity!:null;
  private alertComponent:AlertComponent;
  protected doctors!:Doctor[];
  protected specialitys!:Speciality[];
  protected doctor!:Doctor;
  protected action!:string;


  constructor(private identityService:IdentityService, private doctorService:DoctorService, private specialityService:SpecialityService) {
    this.token = this.identityService.getToken();
    this.alertComponent = new AlertComponent();
    this.doctors = [];
    this.doctor = new Doctor("", "", "","","", "activo", "");
  }

  ngOnInit(): void {
    this.allDoctors();
    this.allSpeciality();
  }

  protected searchDoctor(search:string): void {
    if (search.length > 0) {
      this.doctorService.searchDoctor(this.token, search).subscribe(
        response => {
          if(response.status == "OK"){
            this.doctors = response.doctors;
          }else{
            this.alertComponent.error(response.message);
          }
        }
      )
    }else{
      this.allDoctors();
    }
  }

  protected openForm(action:string): void {
    let content = document.querySelector(".content-form");
    content?.classList.add("content-form-active");
    this.action = action;
  }

  protected closeForm(): void {
    let content = document.querySelector(".content-form");
    content?.classList.remove("content-form-active");
  }

  private allDoctors(): void {
    this.doctorService.allDoctors(this.token).subscribe(
      response => {
        if(response.status == "OK"){
          this.doctors = response.doctors;
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected allSpeciality(): void {
    this.specialityService.allSpecialities(this.token).subscribe(
      response => {
        if (response.status == "OK") {
          this.specialitys = response.specialitys;
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected onSubmit(form:NgForm): void {
    if(this.action == "save"){
      this.saveDoctor(form);
    }else{
      this.updateDoctor();
    }
  }

  protected saveDoctor(form:NgForm): void {
    this.doctorService.saveDoctor(this.token, this.doctor).subscribe(
      response => {
        if(response.status == "created"){
          form.reset();
          this.allDoctors();
          this.closeForm();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );

  }

  protected getDoctor(document:string): void {
    this.doctorService.getDoctor(this.token, document).subscribe(
      response => {
        if(response.status == "OK"){
          this.doctor = response.doctor;
          this.openForm("updated");
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected updateDoctor(): void {
    this.doctorService.updateDoctor(this.token, this.doctor).subscribe(
      response => {
        if (response.status == "created"){
          this.closeForm();
          this.allDoctors();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message);
        }
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

  protected deleteDoctor(document:string): void {
    this.doctorService.deleteDoctor(this.token, document).subscribe(
      response => {
        if(response.status == "not content") {
          this.allDoctors();
          this.closeForm();
          this.doctor = new Doctor("", "", "", "", "", "", "activo");
          this.closeOverlay();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );

  }
}
