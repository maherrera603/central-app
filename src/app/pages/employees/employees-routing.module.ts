import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)},
  {path: "citas", loadChildren: () => import("./pages/cites/cites.module").then(m => m.CitesModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
