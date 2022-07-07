import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditTeamsPage } from './modal-edit-teams.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditTeamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditTeamsPageRoutingModule {}
