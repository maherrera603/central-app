import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PattientsRoutingModule } from './pattients-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PattientsRoutingModule
  ]
})
export class PattientsModule { }
