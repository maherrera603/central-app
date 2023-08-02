import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Pattient } from '@app/models/Pattient';
import { Doctor } from '@app/models/doctor';
import { Cite } from '@app/models/cite';
import { Family } from '@app/models/family';
import { Speciality } from '@app/models/speciality';
import { Status } from '@app/models/status';
import { CiteService } from '@app/services/cite.service';
import { FamilyService } from '@app/services/family.service';
import { IdentityService } from '@app/services/identity.service';
import { PattientService } from '@app/services/pattient.service';
import { SpecialityService } from '@app/services/speciality.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-cite',
  templateUrl: './add-cite.component.html',
  styleUrls: ['./add-cite.component.scss'],
  providers: [IdentityService, FamilyService, SpecialityService, PattientService, CiteService]
})
export class AddCiteComponent implements OnInit, OnDestroy {
  private alertComponent: AlertComponent = new AlertComponent();
  private token!:string|null;
  private suscription!:Subscription;
  private speciality!:Speciality;
  private doctor:Doctor = new Doctor(1, "", "", "", "", "", 1, this.speciality);
  protected status!:Status;
  protected familys!: Family[];
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
    this.cite = new Cite(1,"", "", "", "","", "", this.speciality, this.status, this.doctor, "","", this.pattient);
  }

  ngOnInit(): void {
    this.removeNavigation();
    this.allFamily();
    this.allSpecialitys();
    this.suscription = this.citeService.refresh$.subscribe(() => this.allFamily());
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-user-active");
    navigation?.classList.remove("navigation-user-active");
    let arrow_bottom = document.querySelector('.fa-sharp.fa-solid.fa-caret-right');
    arrow_bottom?.classList.remove("arrow-rigth");
  }

  protected searchFamily(search:string): void{
    if(search.length > 0){
      this.familyService.searchFamily(this.token, search).subscribe(
        response => {
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
      response => this.specialitys = response.specialitys
    );
  }

  private loadCite(object:any): void{
    this.cite.name = object.name;
    this.cite.last_name = object.last_name;
    this.cite.type_document = object.type_document;
    this.cite.document = object.document;
    this.cite.phone = object.phone;
    this.cite.eps = object.eps;
    this.openForm();
  }

  private getFamily(document:string): void{
    this.familyService.getFamily(document, this.token).subscribe(
      response => {
        if(response.status == "OK"){
          this.loadCite(response.family);
          this.openForm();
        }
      }
    );
  }

  protected loadForm(document:string):void{
    (this.pattient.document == document)? this.loadCite(this.pattient): this.getFamily(document);
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
    this.cite.status = new Status(4, "");
    this.citeService.addCite(this.token, this.cite).subscribe(
      response => {
        console.log(response)
        this.closeForm();
        (response.status === "created")? this.alertComponent.success(response.message):this.alertComponent.error(response.message);
      }
    );

  }
}
