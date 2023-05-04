import { Component, OnInit, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'central-app';
  protected cssIndex!:string;

  constructor(){
  }

  ngOnInit(): void {
  }

}
