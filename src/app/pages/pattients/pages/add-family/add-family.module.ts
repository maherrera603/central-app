import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFamilyRoutingModule } from './add-family-routing.module';
import { AddFamilyComponent } from './add-family.component';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddFamilyComponent,
  ],
  imports: [
    AddFamilyRoutingModule,
    CommonModule,
    NavigationLeftModule,
    RouterModule,
    FormsModule,
    HttpClientModule

  ]
})
export class AddFamilyModule { }
