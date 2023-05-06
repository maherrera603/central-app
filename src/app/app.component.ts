import { Component, OnInit } from '@angular/core';
import { IdentityService } from './services/identity.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ IdentityService ]
})
export class AppComponent implements OnInit{
  protected title:string = 'central de citas';
  protected cssIndex!:string;


  constructor(){
  }

  ngOnInit(): void {
  }



}
