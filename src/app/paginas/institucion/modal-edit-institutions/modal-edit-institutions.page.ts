import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { InLogo } from 'src/app/Interface/InLogo';
import { InstitucionService } from 'src/app/servicios/institucion.service';

@Component({
  selector: 'app-modal-edit-institutions',
  templateUrl: './modal-edit-institutions.page.html',
  styleUrls: ['./modal-edit-institutions.page.scss'],
})
export class ModalEditInstitutionsPage implements OnInit {

  @Input() _id: number;
  @Input() _name:string;
  @Input() _president:string;
  @Input() _logo:string;


  fileSelect:any;
  file:File | any;
  formLogo:InLogo;
  form:FormGroup;
  constructor
  (
    private institucionService: InstitucionService, 
    public alertController: AlertController,
    private modalCtrl:ModalController,
    private fb:FormBuilder
  ) 
  {
    this._loadForm();
   }

  private _loadForm() {
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      president: ['', Validators.required],
      logo: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.getForm();
  }
  getForm(){
    this.form.controls['id'].setValue(this._id);
    this.form.controls['name'].setValue(this._name);
    this.form.controls['president'].setValue(this._president);
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
    
    this.institucionService.updateLogoIntitutions(this._id,this.formLogo).subscribe({
      next:(res)=>{
        this.alert(res['message']);
      },
      error:(err)=>console.log(err)
    });
  }
  _update(){
    this.modalCtrl.dismiss({
      id:this.form.controls['id'].value,
      name:this.form.controls['name'].value,
      president:this.form.controls['president'].value,
    });
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }

  async alert(message:string) {
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

}
