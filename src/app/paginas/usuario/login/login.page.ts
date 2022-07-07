import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private usuarioService: ServicioService,private router:Router) { }

  ngOnInit() {
  }
  login(user:any, password:any){

    this.usuarioService.login(user.value,password.value)
      .subscribe({
        next: (data) => {
     
          localStorage.setItem('token', data.acces_token);
          this.router.navigateByUrl('home');
          
        },
        error: (err) => {
          
        }
      })
    }
}
