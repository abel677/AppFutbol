import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'institution',
    pathMatch: 'full'
  },
  {
    path: 'tipos-usuario',
    loadChildren: () => import('./paginas/usuario/tipos-usuario/tipos-usuario.module').then( m => m.TiposUsuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/usuario/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./paginas/usuario/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'institution',
    loadChildren: () => import('./paginas/institucion/institucion.module').then( m => m.InstitucionPageModule)
  },
  {
    path: 'types-persons',
    loadChildren: () => import('./paginas/types-persons/types-persons.module').then( m => m.TypesPersonsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./paginas/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'modal-edit-institutions',
    loadChildren: () => import('./paginas/institucion/modal-edit-institutions/modal-edit-institutions.module').then( m => m.ModalEditInstitutionsPageModule)
  }



  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
