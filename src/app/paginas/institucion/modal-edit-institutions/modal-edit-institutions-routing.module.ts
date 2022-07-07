import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditInstitutionsPage } from './modal-edit-institutions.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditInstitutionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditInstitutionsPageRoutingModule {}
