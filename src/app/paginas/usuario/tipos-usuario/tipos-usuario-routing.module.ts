import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposUsuarioPage } from './tipos-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: TiposUsuarioPage
  },
  {
    path: 'modal-edit-tipo',
    loadChildren: () => import('./modal-edit-tipo/modal-edit-tipo.module').then( m => m.ModalEditTipoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposUsuarioPageRoutingModule {}
