import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;
  tipos: any;
  constructor(private usuarioService: ServicioService,
    private router: Router,
    public toastController: ToastController, 
    public formBuilder: FormBuilder) {

  }
  get errorControl() {
    return this.registerForm.controls;
  }
  construirForm() {
    this.registerForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]2,3$')
  ngOnInit() {
    this.construirForm();
    this.traertypes()
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Todos los campos son requerido!')
      return false;
    }
    else {
      this.usuarioService.register(this.registerForm.value.usuario,
        this.registerForm.value.password, this.registerForm.value.email, 1)
        .subscribe({
          next: (s) => {
            this.showalert("Usuario creado!");
            this.registerForm.reset();
            this.router.navigate(['/login'])
          }, error: (e) => {
            this.showalert(e.message);
          }
        })
    }
  }
  traertypes() {
    this.usuarioService.traertypes()
      .subscribe({
        next: (data) => {
          this.tipos = data;
        },
        error: (e) => {
          this.showalert(e.message);
        }
      })
  }
  async showalert(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
