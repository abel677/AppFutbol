import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InTypeuser } from 'src/app/Interface/InForm';
import { ModalEditTipoPage } from './modal-edit-tipo/modal-edit-tipo.page';

@Component({
  selector: 'app-tipos-usuario',
  templateUrl: './tipos-usuario.page.html',
  styleUrls: ['./tipos-usuario.page.scss'],
})

export class TiposUsuarioPage implements OnInit {
  @ViewChild('list') list: IonList;
  form: FormGroup
  getTypeUser: InTypeuser[];

  constructor(private usuariosService: UsuariosService, private fb: FormBuilder, public alertController: AlertController, public routerOutlet: IonRouterOutlet, private modalsCtrl: ModalController) { }

  private loadForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      type_user: ['', Validators.required],
      state: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loadForm()
    this.types();
  }

  register_types() {
    this.usuariosService.register_types(this.form.value).subscribe({
      next: (s) => {
        this.types()
      }, error: (e) => {
        debugger
      }
    })
    this.form.reset();
  }



  types() {
    this.usuariosService.gettypes().subscribe({
      next: (res: InTypeuser[]) => {
        this.getTypeUser = res;
      }, error: (error) => {
      }
    })
  }

  async eliminar(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-eliminar-class',
      header: '¿Estás seguro que deseas eliminar?',
      // message: 'Message <strong></strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.list.closeSlidingItems();
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log(this.usuariosService.userdelete(id).subscribe({
              next: (s) => {
                this.types()
              }, error: (e) => {
              }
            }));
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

  BuscarTipo(id: number) {
    this.usuariosService.showTypeUser(id).subscribe({
      next: (res: InTypeuser) => {
        this.openModals(res);
      }, error: (error) => {

      }
    });
  }

  async openModals(datos: InTypeuser) {
    const modal = await this.modalsCtrl.create({
      component: ModalEditTipoPage,
      componentProps: {
        _id: datos.id,
        _type_user: datos.type_user,
        _state: datos.state
      },
      cssClass: 'my-custom-class'

    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log("retorno del modal", data)
    this.list.closeSlidingItems();
    this.types();
  }

}



