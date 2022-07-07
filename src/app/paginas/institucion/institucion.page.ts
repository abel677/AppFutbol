import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { InInstitucion } from 'src/app/Interface/InInstitucion';
import { InLogo } from 'src/app/Interface/InLogo';
import { InstitucionService } from 'src/app/servicios/institucion.service';
import { ModalEditInstitutionsPage } from './modal-edit-institutions/modal-edit-institutions.page';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.page.html',
  styleUrls: ['./institucion.page.scss'],
})
export class InstitucionPage implements OnInit {

  @ViewChild('list') list: IonList;
  form: FormGroup;
  file: any;
  fileSelect: string | ArrayBuffer;
  formulario: InInstitucion;
  formLogo: InLogo;
  institutions: InInstitucion[];
  message: string;
  isValid:boolean = false;

  constructor
    (
      private institucionService: InstitucionService,
      private fb: FormBuilder,
      public alertController: AlertController,
      private modalCtrl: ModalController
    ) {
    this._loadForm();
  }

  ngOnInit() {
    this._getIntitutions();
  }
  private _loadForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      president: ['', Validators.required],
      logo: ['', Validators.required],
    })
  }
  _getIntitutions() {
    this.institucionService.getInstitucion().subscribe({
      next: (res) => {
        this.institutions = res;
        if(this.institutions.length >0){
          this.isValid = true;
        }else{
          this.isValid = false;
        }
      }, error: (err) => console.log(err)
    });
   
  }
  _getFile(event: any) {

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    }
    this.file = (<HTMLInputElement>event.target).files[0];
  }
  _register() {
    this.formulario = {
      'id': this.form.value.id,
      'name': this.form.value.name,
      'president': this.form.value.president,
      'logo': this.file
    }
    if (this.form.valid != null && this.file != null) {
      this.institucionService.registerInstitucion(this.formulario).subscribe({
        next: (res) => {
          this.alert(res['message']);
          this._getIntitutions();
        },
        error: (err) => console.log(err)
      });
      this.form.reset();
    } else {
      this.alert("Los campos son requeridos");
    }
    this.form.reset();
  }
  _showIntitution(id: number) {
    this.institucionService.showInstitucion(id).subscribe({
      next: (res: InInstitucion) => {
        this.updateOk(res);

      }, error: (err) => console.log(err)

    });
  }
  _updateInstitution(res: InInstitucion) {
    if (res != null) {
      this.institucionService.updateInstitucion(res.id, res).subscribe({
        next: (res) => {
          this.alert(res['message']);
          this._getIntitutions();
        },
        error: (err) => console.log(err)
      });
    }
    this._getIntitutions();
  }
  _deleteInstitution(id: number) {
    this.institucionService.deleteInstitucion(id).subscribe({
      next: (res) => {
        this.alert(res['message']);
        this._getIntitutions();
        this.list.closeSlidingItems();
      },
      error: (err) => console.log(err)

    });

  }
  
  /* update logo */
  updateLogo(id: number, event: any) {

    this.file = (<HTMLInputElement>event.target).files[0];
    this.formLogo = {
      'id': id,
      'logo': this.file
    }

    this.institucionService.updateLogoIntitutions(id, this.formLogo).subscribe({
      next: (res) => {
        this.alert(res['message']);
        this._getIntitutions();
      },
      error: (err) => console.log(err)

    });
  }




  /* alerts */

  async alert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'modal-delete',
      header: message,
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button'
        }
      ]
    });
    alert.present();
  }
  async deleteOk(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'delete-alert',
      header: '¿Estás seguro que deseas eliminar?',

      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.list.closeSlidingItems();
          }
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {
            this._deleteInstitution(id);
          }
        }
      ]
    });
    alert.present();
  }

  async updateOk(res: InInstitucion) {

    const modal = await this.modalCtrl.create({
      cssClass: 'my-custom-class',
      component: ModalEditInstitutionsPage,
      componentProps: {
        _id: res.id,
        _name: res.name,
        _president: res.president,
        _logo: res.logo
      },


    });
    await modal.present();
    this.list.closeSlidingItems();
    const { data } = await modal.onDidDismiss();
    this._updateInstitution(data);



  }
}
