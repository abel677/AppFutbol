import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditInstitutionsPageRoutingModule } from './modal-edit-institutions-routing.module';

import { ModalEditInstitutionsPage } from './modal-edit-institutions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditInstitutionsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalEditInstitutionsPage]
})
export class ModalEditInstitutionsPageModule {}
