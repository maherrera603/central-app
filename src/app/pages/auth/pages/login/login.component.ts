import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    this.deleteCssIndex();
  }

  private deleteCssIndex(): void {
    const header = document.querySelector("header");
    header?.classList.remove("index");
  }

  protected onSubmit(form: NgForm) {

  }

}
