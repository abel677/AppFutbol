import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { InInstitucion } from 'src/app/Interface/InInstitucion';
import { InLogo } from 'src/app/Interface/InLogo';
import { InTeams } from 'src/app/Interface/InTeams';
import { InstitucionService } from 'src/app/servicios/institucion.service';
import { TeamsService } from 'src/app/servicios/teams.service';
import { ModalEditTeamsPage } from './modal-edit-teams/modal-edit-teams.page';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  @ViewChild('list') list: IonList;

  form: FormGroup;
  formulario: InTeams;
  teams: InTeams[] = [];

  institutions: InInstitucion[] = [];
  file: File | any;
  fileSelect: any;
  formLogo: InLogo;
  isValid:boolean = false;

  constructor
    (
      private fb: FormBuilder,
      private teamService: TeamsService,
      private alerCtrl: AlertController,
      private institutionService: InstitucionService,
      private modalCtrl: ModalController
    ) {
    this.loadForm();
  }

  private loadForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required],
      id_institution: ['', Validators.required]
    });
  }
  ngOnInit() {
    this._getTeams();
    this._getInstitutions();
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
  updateLogo(id: number, event: any) {

    this.file = (<HTMLInputElement>event.target).files[0];
    this.formLogo = {
      'id': id,
      'logo': this.file
    }
    this.teamService.updateLogoTeams(id, this.formLogo).subscribe({
      next: (res) => {
        this.alert(res['message']);
        this._getTeams();
      },
      error: (err) => console.log(err)

    });
    this.list.closeSlidingItems();
  }
  _getTeams(): void {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res;
        if(this.teams.length > 0){
          this.isValid = true;
        }else{
          this.isValid = false;
        }
      },
      error: (err) => console.log(err)

    });
  }
  _getInstitutions() {
    this.institutionService.getInstitucion().subscribe({
      next: (res) => {
        this.institutions = res;
      },
      error: (err) => console.log(err)

    });
  }
  _deleteTeams(id: number) {
    this.teamService.deleteTeams(id).subscribe({
      next: (res) => {
        this.alert(res['message']);
        this._getTeams();
        this.list.closeSlidingItems();
        this.form.reset();
      }
    });
  }
  _register() {

    this.formulario =
    {
      'id': this.form.value.id,
      'name': this.form.value.name,
      'logo': this.file,
      'id_institution': this.form.value.id_institution,
    }
    if (this.form.valid) {
      this.teamService.postTeams(this.formulario).subscribe({
        next: (res) => {
          this.alert(res['message']);
          this._getTeams();
        },
        error: (err) => console.log(err)
      });
    } else {
      this.alert("Campos requeridos");
    }
    this.form.reset();

  }

  _showTeams(id: number) {
    this.teamService.showTeams(id).subscribe({
      next: (res) => {
        this.updateOk(res);

      },
      error: (err) => console.log(err)
    });
  }
  _updateTeams(res: InTeams) {
    if (res != null) {
      this.teamService.updateTeams(res.id, res).subscribe({
        next: (res) => {
          this.alert(res['message']);
        },
        error: (err) => this.alert(err.error['message'])
      });
    }
    this._getTeams();

  }





  /* alerts */

  async alert(message: string) {
    const alert = this.alerCtrl.create({
      header: message,
      buttons: [
        {
          text: 'ok'
        }
      ]
    });
    (await alert).present();
  }
  async deleteOk(id: number) {
    const alert = await this.alerCtrl.create({
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
            this._deleteTeams(id);
          }
        }
      ]
    });
    alert.present();
  }

  
  async updateOk(res: InTeams) {

    const modal = await this.modalCtrl.create({
      cssClass: 'my-custom-class',
      component: ModalEditTeamsPage,
      componentProps: {
        _id: res.id,
        _name: res.name,
        _logo: res.logo,
        _id_institution: res.id_institution,
      },


    });
    await modal.present();
    this.list.closeSlidingItems();
    const { data } = await modal.onDidDismiss();
    this._updateTeams(data);


  }





}
