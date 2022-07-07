import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditTipoPage } from './modal-edit-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditTipoPageRoutingModule {}
