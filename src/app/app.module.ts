import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { UserService } from './services/user.service';
import { PattientService } from './services/pattient.service';
import { IdentityService } from './services/identity.service';
import { PermissionService } from './services/permission.service';
import { NotpermissionService } from './services/notpermission.service';
import { RouterModule } from '@angular/router';
import { FamilyService } from './services/family.service';
import { EmployeeService } from './services/employee-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    PattientService,
    UserService,
    IdentityService,
    PermissionService,
    NotpermissionService,
    FamilyService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
