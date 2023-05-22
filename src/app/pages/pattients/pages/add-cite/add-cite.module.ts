import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCiteRoutingModule } from './add-cite-routing.module';
import { AddCiteComponent } from './add-cite.component';
import { FormsModule } from '@angular/forms';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddCiteComponent
  ],
  imports: [
    CommonModule,
    AddCiteRoutingModule,
    NavigationLeftModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AddCiteModule { }
