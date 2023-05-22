import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCiteComponent } from './add-cite.component';

const routes: Routes = [
  {path: "", component: AddCiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCiteRoutingModule { }
