import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PattientsRoutingModule } from './pattients-routing.module';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    PattientsRoutingModule,
    CommonModule,
    NavigationLeftModule,
    RouterModule
  ]
})
export class PattientsModule { }
