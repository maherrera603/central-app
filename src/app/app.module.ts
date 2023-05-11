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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PattientService,
    UserService,
    IdentityService,
    PermissionService,
    NotpermissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
