import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Tipos personas', url: '/types-persons', icon: 'add-circle' },
    { title: 'Instituciones', url: '/institution', icon: 'add-circle' },
    { title: 'Equipos', url: '/teams', icon: 'add-circle' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
