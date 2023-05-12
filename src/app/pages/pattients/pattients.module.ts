import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PattientsRoutingModule } from './pattients-routing.module';
import { HomeModule } from './pages/home/home.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PattientsRoutingModule,
    HomeModule,
  ]
})
export class PattientsModule { }
