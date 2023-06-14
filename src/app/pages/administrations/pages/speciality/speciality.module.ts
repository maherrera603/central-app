import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityComponent } from './speciality.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';


@NgModule({
  declarations: [
    SpecialityComponent
  ],
  imports: [
    CommonModule,
    SpecialityRoutingModule,
    HttpClientModule,
    FormsModule,
    NavigationLeftModule
  ]
})
export class SpecialityModule { }
