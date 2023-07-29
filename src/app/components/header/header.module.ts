import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
