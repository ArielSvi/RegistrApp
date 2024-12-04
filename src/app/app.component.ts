import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] // Asegúrate de importar CommonModule aquí
})
export class AppComponent implements OnInit {
  role: any;

  constructor(private router: Router, private menu: MenuController) {}

  ngOnInit() {
    // Escuchar eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
          this.role = navigation.extras.state['rol'];
          console.log('Rol actualizado en navegación:', this.role);
        }
      }
    });
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.menu.close(); // Cierra el menú después de la navegación
  }

  showClase(option: string) {
    if (this.role === 'Alumno' && option === 'Clase') {
      return true;
    }
    return false;
  }

  showAsistencia(option: string) {
    if (this.role === 'Docente' && option === 'Asistencia') {
      return true;
    }
    return false;
  }
}
