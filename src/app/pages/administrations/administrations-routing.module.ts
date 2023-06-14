import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () => import("./pages/home/home.module").then( m => m.HomeModule)},
  {path: "perfil", loadChildren: () => import("./pages/profile/profile.module").then( m => m.ProfileModule)},
  {path: "especialidades", loadChildren: () => import("./pages/speciality/speciality.module").then( m => m.SpecialityModule)},
  {path: "empleados", loadChildren: () => import("./pages/employee/employee.module").then( m => m.EmployeeModule)},
  {path: "medicos", loadChildren: () => import("./pages/doctor/doctor.module").then( m => m.DoctorModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationsRoutingModule { }
