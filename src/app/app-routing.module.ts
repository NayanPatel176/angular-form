import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ResponsiveFormComponent } from './responsive-form/responsive-form.component';

const routes: Routes = [
  {path: "form", component: FormComponent},
  {path: "responsive-form", component: ResponsiveFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
