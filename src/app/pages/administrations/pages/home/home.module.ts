import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavigationLeftComponent } from '@app/components/navigation-left/navigation-left.component';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavigationLeftModule
  ]
})
export class HomeModule { }
