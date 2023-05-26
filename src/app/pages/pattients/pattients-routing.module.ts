import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: "", loadChildren: () => import("./pages/home/home.module").then( m => m.HomeModule)},
  {path: "perfil", loadChildren: () => import("./pages/profile/profile.module").then(m => m.ProfileModule)},
  {path: "familiares", loadChildren: () => import("./pages/add-family/add-family.module").then(m => m.AddFamilyModule)},
  {path: "solicitudes", loadChildren: () => import("./pages/add-cite/add-cite.module").then(m => m.AddCiteModule)},
  {path: "citas", loadChildren: () => import("./pages/cites/cites.module").then(m => m.CitesModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PattientsRoutingModule { }
