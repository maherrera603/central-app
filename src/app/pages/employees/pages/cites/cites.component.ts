import { Component, OnInit, DoCheck } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Pattient } from '@app/models/Pattient';
import { User } from '@app/models/User';
import { Cite } from '@app/models/cite';
import { Doctor } from '@app/models/doctor';
import { Employee } from '@app/models/employee';
import { Speciality } from '@app/models/speciality';
import { Status } from '@app/models/status';
import { CiteService } from '@app/services/cite.service';
import { DoctorService } from '@app/services/doctor.service';
import { IdentityService } from '@app/services/identity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrls: ['./cites.component.scss'],
  providers: [IdentityService, CiteService, DoctorService]
})
export class CitesComponent implements OnInit, DoCheck{
  private token!:string|null;
  private alertComponent!:AlertComponent;
  private user:User = new User("", "");
  private employee = new Employee("","","","","", this.user);
  private status!:Status;
  private pattient!:Pattient;
  private suscription!:Subscription;
  protected speciality:Speciality = new Speciality(1, "", this.employee);
  private doctor:Doctor = new Doctor(1, "", "","", "", "", 1, this.speciality);
  protected cites!:Cite[];
  protected cite!:Cite;
  protected dateToday!:string;
  protected doctors!:Doctor[];

  constructor(
    private identityService: IdentityService,
    private citeService: CiteService,
    private doctorService: DoctorService
  ){
    this.alertComponent = new AlertComponent();
    this.token = this.identityService.getToken();
    this.cites = [];
    this.dateToday = new Date().toLocaleDateString();
    this.cite = new Cite(1,"", "", "", "","", "", this.speciality, this.status, this.doctor, "","", this.pattient);
  }

  ngOnInit(): void {
    this.allCites();
    this.suscription = this.citeService.refresh$.subscribe( () => this.allCites())
  }

  ngDoCheck(): void{
    this.loadStatusStyle();
  }

  private allCites(): void {
    this.citeService.allCitesForEmployees(this.token).subscribe(
      response => {
        if(response.status === "OK"){
          this.cites = response.cites;
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected searchCites(search:string): void {
    if(search.length > 0){
      this.citeService.searchCites(this.token, search).subscribe(
        response => {
          if(response.status === "OK"){
            this.cites = response.cites;
          }else{
            this.alertComponent.error(response.message);
          }
        }
      );
    }else{
      this.allCites();
    }
  }

  protected loadCite(idCite:number, status:string, idSpeciality:number): void {
    if(status.toLowerCase() === "pendiente"){
      this.getCitePendite(idCite, idSpeciality);
    }else{
      this.getCiteConfirm(idCite, idSpeciality);
    }
  }

  private openForm() : void {
    let content_form = document.querySelector(".content-form");
    content_form?.classList.add("content-form-active");
  }

  protected closeForm(): void {
    let content_form = document.querySelector(".content-form");
    content_form?.classList.remove("content-form-active");
  }

  private getCiteConfirm(idCite:number, idSpeciality:number): void {
    this.citeService.getCite(this.token, idCite).subscribe(
      response => {
        if(response.status === "OK"){
          this.cite = response.cite;
          this.getDoctorsBySpeciality(idSpeciality);
          this.openForm();
        }
      }
    );
  }

  private getCitePendite(idCite:number, idSpeciality:number): void {
    this.citeService.getCiteForEmployee(this.token, idCite).subscribe(
      response => {
        if (response.status === "OK"){
          this.cite = response.cite;
          this.getDoctorsBySpeciality(idSpeciality);
          this.openForm();
        }
      }
    );
  }

  private getDoctorsBySpeciality(idSpeciality:number): void {
    this.doctorService.getDoctorBySpeciality(this.token, idSpeciality).subscribe(
      response => {
        if(response.status === "OK"){
          this.doctors = response.doctors;
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected onSubmit(form:NgForm){
    this.cite.status.id = 3;
    this.cite.status.status = "Confirmada"; 
    this.citeService.putCiteForEmployee(this.token, this.cite).subscribe(
      response => {
        if(response.status === "created"){
          this.closeForm();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  private loadStatusStyle(): void{
    let status = document.querySelectorAll("p .status");
    status.forEach(e => {
      if(e.textContent === " Pendiente "){
        e.classList.add("danger")
      }else{
        e.classList.remove("danger")
      }
    });
  }
}
