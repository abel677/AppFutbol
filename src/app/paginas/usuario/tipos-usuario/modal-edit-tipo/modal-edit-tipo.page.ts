import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-modal-edit-tipo',
  templateUrl: './modal-edit-tipo.page.html',
  styleUrls: ['./modal-edit-tipo.page.scss'],
})
export class ModalEditTipoPage implements OnInit {

  @Input() _id:any;
  @Input() _type_user:any;
  @Input() _state:any;

  form:FormGroup;
 
  constructor(
    public modalCtrl:ModalController, private fb:FormBuilder, private usuariosService:UsuariosService
    
  ) { this.form = this.fb.group({
    id:[''],
    type_user:['', Validators.required],
    state:['', Validators.required]
  });
}

  ngOnInit() {
    this.getType();
    
  }
   

  getType(){
    this.form.controls['id'].setValue(this._id);
    this.form.controls['type_user'].setValue(this._type_user);
    this.form.controls['state'].setValue(this._state);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  edit(){
    if(this.form.valid){
      if(this.form.controls['state'].value){
        this.form.controls['state'].setValue(1)
      }else{
        this.form.controls['state'].setValue(0)
      }
      this.usuariosService.useruptade(this._id, this.form.value).subscribe({
        next:(res)=>{
        },error:(e)=>{
        }
      })
      this.modalCtrl.dismiss({
        _id:this.form.controls['id'].value,
        _type_user:this.form.controls['type_user'].value,
        _state:this.form.controls['state'].value
        }      
      )
      this.form.reset( );
    }

 
   
  
  }
}
