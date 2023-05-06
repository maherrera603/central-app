import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", children: [
    {path: "", loadChildren: () => import("./pages/static/static.module").then(m => m.StaticModule)},
    {path: "", loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)},
    {path: "", loadChildren: () => import("./pages/pattients/pattients.module").then(m => m.PattientsModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
