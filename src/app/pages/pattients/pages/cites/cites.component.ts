import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Cite } from '@app/models/cite';
import { CiteService } from '@app/services/cite.service';
import { IdentityService } from '@app/services/identity.service';

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrls: ['./cites.component.scss'],
  providers: [IdentityService, CiteService]
})
export class CitesComponent implements OnInit{
  private token!:string|null;
  private alertComponent!:AlertComponent;
  protected cites!:Cite[];
  protected cite!:Cite;


  constructor(private identityService: IdentityService, private citeService: CiteService){
    this.token = this.identityService.getToken();
    this.alertComponent = new AlertComponent();
    this.cite = new Cite(1, "", "", "", "", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.allCites();
    this.removeNavigation();
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-user-active");
    navigation?.classList.remove("navigation-user-active");
  }

  protected searchCite(search:string): void {
    if(search.length > 0){
      this.citeService.getSearchCites(this.token, search).subscribe(
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

  private allCites(){
    this.citeService.allCites(this.token).subscribe(
      response => {
        if(response.status === "OK"){
          this.cites = response.cites;
        }else{
          this.alertComponent.error(response.message)
        }
      }
    );
  }

  protected loadForm(idCite:number, status:string): void {
    if(status != "Pendiente"){
      this.citeService.getCite(this.token, idCite).subscribe(
        response => {
          if(response.status == "OK"){
            this.cite = response.cite;
            this.showForm();
          }
        }
      );
    }else{
      this.alertComponent.error("La cita no ha sido confirmada");
    }
  }

  protected showForm():void {
    let content_form = document.querySelector(".content-form");
    content_form?.classList.add("content-form-active");
    let notifications = document.querySelector(".notifications");
    notifications?.classList.remove("notifications-active");
  }

  protected closeForm():void {
    let content_form = document.querySelector(".content-form");
    content_form?.classList.remove("content-form-active");
  }

  protected onSubmit(form:NgForm):void{

  }

  protected showNotifications():void{
    let notifications = document.querySelector(".notifications");
    let notifications_active = document.querySelector(".notifications-active");
    if(notifications_active == null){
      notifications?.classList.add("notifications-active");
    }else{
      notifications?.classList.remove("notifications-active");
    }
  }

  protected showOverlay():void {
    let overlay = document.querySelector(".overlay");
    overlay?.classList.add("overlay-active");
    this.closeForm();
  }

  protected closeOverlay() : void {
    let overlay = document.querySelector(".overlay");
    overlay?.classList.remove("overlay-active");
  }
}
