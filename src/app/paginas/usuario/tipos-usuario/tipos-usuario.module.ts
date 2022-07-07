import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TiposUsuarioPageRoutingModule } from './tipos-usuario-routing.module';
import { TiposUsuarioPage } from './tipos-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiposUsuarioPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [TiposUsuarioPage]
})
export class TiposUsuarioPageModule {}
