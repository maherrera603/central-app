import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { PermissionService } from './services/permission.service';
import { NotpermissionService } from './services/notpermission.service';

const routes: Routes = [
  {path: "", canActivate: [NotpermissionService], children: [
    {path: "", loadChildren: () => import("./pages/static/static.module").then(m => m.StaticModule)},
    {path: "", loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)},
  ]},
  {path: "sistema", canActivate: [PermissionService], children: [
    {path: "", loadChildren: () => import("./pages/pattients/pattients.module").then(m => m.PattientsModule)},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
