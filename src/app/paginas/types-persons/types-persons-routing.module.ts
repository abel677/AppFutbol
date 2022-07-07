import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypesPersonsPage } from './types-persons.page';

const routes: Routes = [
  {
    path: '',
    component: TypesPersonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesPersonsPageRoutingModule {}
