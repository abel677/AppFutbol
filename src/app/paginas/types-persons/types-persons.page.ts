import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonList } from '@ionic/angular';
import { InTypesPersons } from 'src/app/Interface/InTypesPersons';
import { TypesPersonsService } from 'src/app/servicios/types-persons.service';

@Component({
  selector: 'app-types-persons',
  templateUrl: './types-persons.page.html',
  styleUrls: ['./types-persons.page.scss'],
})
export class TypesPersonsPage implements OnInit {

  @ViewChild('list') list:IonList;
  
  TypesPersons: InTypesPersons[] = [];
  form:FormGroup;
  message:string;
  typePerson:InTypesPersons = {
    id:1,
    type_person:"Ju"
  }

  
  constructor
  (
    private typeService: TypesPersonsService,
    private fb:FormBuilder,
    private typePersonServide:TypesPersonsService,
    private alertController: AlertController,
  ) 
  {
    this.initForm();
  }
  ngOnInit() {
    this._getTypesPersons();
    
  }
  private initForm(){
    this.form = this.fb.group({
      type_person:['',Validators.required]
    });
  }

  register(){
    if(this.form.valid){
      this.typePersonServide.postTypesPersons(this.form.value).subscribe({
        next:(res)=>{
          this._getTypesPersons();
          this.alert(res['message']);
          this.form.reset();
        },
        error:(err)=> this.alert(err['message'])
      });
    }else{
      this.alert("El campo es requerido")
    }
  }
  _getTypesPersons(){
    this.typeService.getTypesPersons().subscribe({
      next: (res) => this.TypesPersons = res,
      error: (err) => console.log(err)
    });
  }
  _delete(id:number){
    this.typePersonServide.deleteTypesPersons(id).subscribe({
      next:(res)=>{
        this._getTypesPersons();
        this.alert(res['message']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this.list.closeSlidingItems();
  }
  _search(id:number){
    this.typePersonServide.showTypesPersons(id).subscribe({
      next:(res)=>{
        this.update(res);        
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this.list.closeSlidingItems();
  }
  _update(id:number,res:InTypesPersons){
    this.typePersonServide.updateTypesPersons(id,res).subscribe({
      next:(res)=>{
        this._getTypesPersons();   
        this.alert(res['message']);  
      },
      error:(err)=>console.log(err)
      
    });
  }


  /* modales */

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
  async delete(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'modal-delete',
      header: '¿Estás seguro que deseas eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            this.list.closeSlidingItems();
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            this._delete(id);
          }
        }
      ]
    });
    alert.present();
  }
  async update(res:InTypesPersons) {
    const alert = await this.alertController.create({
      header: 'Deseas actualizar el campo',
      inputs: [
        {
          type:'text',
          placeholder: 'Tipo de persona',
          value:res.type_person
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            this.list.closeSlidingItems();
          }
        }, {
          text: 'Actualizar',
          id: 'confirm-button',
          handler: (data) => {
            res.type_person = data[0];
            this._update(res.id,res);
            this._getTypesPersons();
           this.list.closeSlidingItems();
          }
        }
      ],
      
    });
    await alert.present();
  }

  

}
