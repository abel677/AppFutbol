import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { InInstitucion } from 'src/app/Interface/InInstitucion';
import { InLogo } from 'src/app/Interface/InLogo';
import { InstitucionService } from 'src/app/servicios/institucion.service';
import { TeamsService } from 'src/app/servicios/teams.service';

@Component({
  selector: 'app-modal-edit-teams',
  templateUrl: './modal-edit-teams.page.html',
  styleUrls: ['./modal-edit-teams.page.scss'],
})
export class ModalEditTeamsPage implements OnInit {

  @Input() _id: number;
  @Input() _name:string;
  @Input() _logo:string;
  @Input() _id_institution:number;


  institutions:InInstitucion[] = [];
  fileSelect:any;
  file:File | any;
  formLogo:InLogo;
  form:FormGroup;

  constructor
  (
    private modalCtrl:ModalController,
    private institutionService:InstitucionService,
    private fb:FormBuilder,
    private alerCtrl:AlertController,
    private teamService:TeamsService
  ) 
  {
    this.loadForm();
  }
  private loadForm(){
    this.form = this.fb.group({
      id:[''],
      name:['', Validators.required],
      id_institution:['' ,Validators.required]
    });
  }

  ngOnInit() {
    this._getInstitutions();
    this.getForm();   
  }

 
  getForm(){
    this.form.controls['id'].setValue(this._id);
    this.form.controls['name'].setValue(this._name);
    this.form.controls['id_institution'].setValue(this._id_institution);
  }
 
  closeModal(){
    this.modalCtrl.dismiss();
  }
  _getInstitutions(){
    this.institutionService.getInstitucion().subscribe({
      next:(res)=> {
        this.institutions = res;
      },
      error:(err)=>console.log(err)      

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
    this.formLogo = {
      'id':this._id,
      'logo':this.file
    }
    
    this.teamService.updateLogoTeams(this._id,this.formLogo).subscribe({
      next:(res)=>{
        this.alert(res['message']);
      },
      error:(err)=>console.log(err)
    });
  }





  
  _update() {
    this.modalCtrl.dismiss({
      id:this.form.controls['id'].value,
      name:this.form.controls['name'].value,
      id_institution:this.form.controls['id_institution'].value,

    });

  }





  async alert(message:string){
    const alert = this.alerCtrl.create({
      header:message,
      buttons:[
        {
          text:'ok'
        }
      ]
    });
    (await alert).present();
  }

}
