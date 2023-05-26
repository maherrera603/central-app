import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Pattient } from '@app/models/Pattient';
import { Cite } from '@app/models/cite';
import { Family } from '@app/models/family';
import { Speciality } from '@app/models/speciality';
import { CiteService } from '@app/services/cite.service';
import { FamilyService } from '@app/services/family.service';
import { IdentityService } from '@app/services/identity.service';
import { PattientService } from '@app/services/pattient.service';
import { SpecialityService } from '@app/services/speciality.service';

@Component({
  selector: 'app-add-cite',
  templateUrl: './add-cite.component.html',
  styleUrls: ['./add-cite.component.scss'],
  providers: [IdentityService, FamilyService, SpecialityService, PattientService, CiteService]
})
export class AddCiteComponent implements OnInit{
  protected familys!: Family[];
  private alertComponent: AlertComponent = new AlertComponent();
  private token!:string|null;
  protected pattient!:Pattient;
  protected cite!:Cite;
  protected specialitys!: Speciality[];


  constructor(
    private identityService:IdentityService,
    private familyService:FamilyService,
    private specialityService:SpecialityService,
    private pattientService:PattientService,
    private citeService:CiteService
  ){
    this.token = this.identityService.getToken();
    this.pattient = this.identityService.getUser();
    this.cite = new Cite(1,"", "", "", "", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.removeNavigation();
    this.allFamily();
    this.allSpecialitys();
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-user-active");
    navigation?.classList.remove("navigation-user-active");
  }

  protected searchFamily(search:string): void{
    if(search.length > 0){
      this.familyService.searchFamily(this.token, search).subscribe(
        response => {
          console.log(response);
          if (response.status == "OK"){
            this.familys = response.familys;

          }else{
            this.alertComponent.error(response.message);
          }
        }
      );
    }else{
      this.allFamily();
    }
  }

  private allFamily():void {
    this.familyService.allFamily(this.token).subscribe(
      response => {
        if (response.status == "OK" ){
          this.familys = response.familys;
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected allSpecialitys():void{
    this.specialityService.allSpecialities(this.token).subscribe(
      response => {
        this.specialitys = response.specialitys;
      }
    );
  }

  private getPattient(document:string): void{
    this.pattientService.getPattient(this.token, document).subscribe(
      response => {
        if(response.status === "OK"){
          this.cite = response.pattient;
          this.openForm();
        }
      }
    );

  }

  private getFamily(document:string): void{
    this.familyService.getFamily(document, this.token).subscribe(
      response => {
        if(response.status == "OK"){
          this.cite = response.family;
          this.openForm();
        }
      }
    );
  }

  protected loadForm(document:string):void{
    (this.pattient.document == document)? this.getPattient(document): this.getFamily(document);

  }

  protected openForm():void{
    let form = document.querySelector(".content-form")
    form?.classList.add("content-form-active");
  }

  protected closeForm():void{
    let form = document.querySelector(".content-form")
    form?.classList.remove("content-form-active");
  }

  protected onSubmit(form:NgForm){
    this.cite.status = "pendiente";
    this.citeService.addCite(this.token, this.cite).subscribe(
      response => {
        console.log(response);
        this.closeForm();
        (response.status === "created")? this.alertComponent.success(response.message):this.alertComponent.error(response.message);
      }
    );

  }
}
