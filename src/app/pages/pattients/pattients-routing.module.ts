import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:"", loadChildren: () => import("./pages/home/home.module").then( m => m.HomeModule)},
  {path: "", loadChildren: () => import("./pages/profile/profile.module").then(m => m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PattientsRoutingModule { }
