import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitucionPage } from './institucion.page';

const routes: Routes = [
  {
    path: '',
    component: InstitucionPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitucionPageRoutingModule {}
