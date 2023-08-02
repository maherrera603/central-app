import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLeftComponent } from './navigation-left.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    NavigationLeftComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    NavigationLeftComponent
  ]
})
export class NavigationLeftModule { }
