import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavigationLeftComponent } from '@app/components/navigation-left/navigation-left.component';





@NgModule({
  declarations: [
    HomeComponent,
    NavigationLeftComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ]
})
export class HomeModule { }
