import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () => import("./pages/registration/registration.module").then(m => m.RegistrationModule)},
  {path: "", loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
