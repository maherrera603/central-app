import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitesComponent } from './cites.component';

const routes: Routes = [
  {path: "", component: CitesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitesRoutingModule { }
