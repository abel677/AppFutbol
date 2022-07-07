import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditTipoPageRoutingModule } from './modal-edit-tipo-routing.module';

import { ModalEditTipoPage } from './modal-edit-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditTipoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalEditTipoPage]
})
export class ModalEditTipoPageModule {}
