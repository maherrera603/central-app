import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitesRoutingModule } from './cites-routing.module';
import { CitesComponent } from './cites.component';
import { NavigationLeftModule } from '@app/components/navigation-left/navigation-left.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CitesComponent
  ],
  imports: [
    CommonModule,
    CitesRoutingModule,
    HttpClientModule,
    FormsModule,
    NavigationLeftModule,
  ]
})
export class CitesModule { }
