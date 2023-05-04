import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private alert: AlertComponent = new AlertComponent();

  constructor() {}

  ngOnInit(): void {
    this.deleteCssIndex();
  }

  private deleteCssIndex(): void {
    const header = document.querySelector("header");
    header?.classList.remove("index")
  }

  onSubmit(form: NgForm){
    this.alert.success("Usuario Registrado Correctamente!");

  }



}
