import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypesPersonsPageRoutingModule } from './types-persons-routing.module';

import { TypesPersonsPage } from './types-persons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypesPersonsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TypesPersonsPage]
})
export class TypesPersonsPageModule {}
