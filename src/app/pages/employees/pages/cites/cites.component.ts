import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Cite } from '@app/models/cite';
import { Doctor } from '@app/models/doctor';
import { CiteService } from '@app/services/cite.service';
import { DoctorService } from '@app/services/doctor.service';
import { IdentityService } from '@app/services/identity.service';

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrls: ['./cites.component.scss'],
  providers: [IdentityService, CiteService, DoctorService]
})
export class CitesComponent implements OnInit{
  private token!:string|null;
  private alertComponent!:AlertComponent;
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
    this.cite = new Cite(1, "", "", "", "", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.allCites();

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

  protected loadCite(idCite:number, status:string): void {
    if(status.toLowerCase() === "pendiente"){
      this.getCitePendite(idCite);
    }else{
      this.getCiteConfirm(idCite);
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

  private getCiteConfirm(idCite:number): void {
    this.citeService.getCite(this.token, idCite).subscribe(
      response => {
        if(response.status === "OK"){
          this.cite = response.cite;
          this.allDoctors();
          this.openForm();
        }
      }
    );
  }

  private getCitePendite(idCite:number): void {
    this.citeService.getCiteForEmployee(this.token, idCite).subscribe(
      response => {
        if (response.status === "OK"){
          this.cite = response.cite;
          this.allDoctors();
          this.openForm();
        }
      }
    );
  }

  private allDoctors(): void {
    this.doctorService.allDoctors(this.token).subscribe(
      response => {
        if(response.status === "OK"){
          this.doctors = response.doctors;
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }
}
