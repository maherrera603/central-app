import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Family } from '@app/models/family';
import { FamilyService } from '@app/services/family.service';
import { IdentityService } from '@app/services/identity.service';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.scss', "../home/home.component.scss"],
  providers: [FamilyService, IdentityService]
})
export class AddFamilyComponent implements OnInit {
  protected navLeft: boolean = false;
  protected page:string = "Familiares";
  protected family!:Family;
  protected familys!: Family[];
  private token!:string | null;
  protected titleForm!:string;
  private alertComponent!:AlertComponent;
  protected methodSend!:string;

  constructor(private familyService: FamilyService, private identityService: IdentityService){
    this.token = this.identityService.getToken();
    this.family = new Family("", "", "", "", "", "");
    this.alertComponent = new AlertComponent();
  }

  ngOnInit(): void {
    this.allFamilys();
  }

  private allFamilys(): void {
    this.familyService.allFamily(this.token).subscribe(
      response => {
        this.familys = response.familys;
      }
    );
  }

  protected loadForm(document:string): void {
    this.familyService.getFamily(document, this.token).subscribe(
      response => {
        if (response.status === "OK"){
          this.family = response.family;
          this.titleForm = `${this.family.name}`;
          this.showForm("updated");
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected addForm(methodSend:string): void {
    this.titleForm = "Agregar Familiar";
    this.family = new Family("", "", "", "", "", "");
    this.showForm(methodSend);
  }

  private showForm(methodsend:string):void{
    this.methodSend = methodsend;
    let content_form = document.querySelector(".content-form");
    content_form?.classList.add("form-activate");
  }

  protected closeForm():void{
    let content_form = document.querySelector(".content-form");
    content_form?.classList.remove("form-activate");
  }

  protected onSubmit(form:NgForm): void{
    (this.methodSend == "add") ? this.addFamily(form) : this.updateFamily();
  }

  private addFamily(form:NgForm):void {
    this.familyService.addFamily(this.family, this.token).subscribe(
      response => {
        if (response.status == "created"){
          this.allFamilys();
          form.reset();
          this.closeForm();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  private updateFamily():void {
    this.familyService.updateFamily(this.family, this.token).subscribe(
      response => {
        if (response.status == "created"){
          this.closeForm();
          this.alertComponent.success(response.message);
          this.allFamilys();
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected openOverlay():void {
    this.closeForm();
    let overlay = document.querySelector(".overlay");
    overlay?.classList.add("overlay-active");
  }

  protected closeOverlay():void {
    let overlay = document.querySelector(".overlay");
    overlay?.classList.remove("overlay-active");
  }

  protected deleteFamily(document:string):void {
    this.familyService.deleteFamily(this.token, document).subscribe(
      response => {
        if( response.status == "not content"){
          this.closeOverlay();
          this.allFamilys();
          this.alertComponent.success(response.message);
        }else{
          this.alertComponent.error(response.message);
        }
      }
    );
  }

  protected searchFamuily(search:string): void{
    if(search.length > 0){
      this.familyService.searchFamily(this.token, search).subscribe(
        response => {
          if(response.status === "OK"){
            this.familys = response.familys
          }else{
            this.alertComponent.error(response.message);
          }
        }
      );
    }else{
      this.allFamilys();
    }
  }

}
