import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';
import { RouterModule } from '@angular/router';







@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    NavigationLeftModule,
    RouterModule
  ]
})
export class HomeModule { }
