import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AlertComponent } from '@app/components/alert/alert.component';
import { Pattient } from '@app/models/Pattient';
import { PattientService } from '@app/services/pattient.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [ PattientService ]
})
export class RegistrationComponent implements OnInit {
  private alert: AlertComponent = new AlertComponent();
  protected pattient!: Pattient;

  constructor(private pattientService: PattientService) {
    this.pattient = new Pattient("", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.deleteCssIndex();
    this.removeNavigation();
  }

  private deleteCssIndex(): void {
    let header = document.querySelector("header");
    header?.classList.remove("index")
  }

  private removeNavigation(): void {
    let navigation = document.querySelector(".navigation-active");
    navigation?.classList.remove("navigation-active");
  }

  onSubmit(form: NgForm){
    this.pattientService.registerPattient(this.pattient).subscribe(
      response => {
        if (response.status == "bad request"){
          this.alert.error(response.message)
        }else{
          this.alert.success(response.message);
          form.reset();
        }
      }
    );



  }



}
