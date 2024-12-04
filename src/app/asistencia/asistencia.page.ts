import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

interface Alumno {
  nombreAlumno: string;
  rutAlumno: string;
  carreraAlumno: string;
  asistenciaAlumno: string;
  seccionAlumno: string;
  fechaAlumno: string;
  identificadorAlumno: string;
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // Asegúrate de incluir CommonModule aquí
})
export class AsistenciaPage implements OnInit {
  alumnos: Alumno[] = []; // Almacena la lista de alumnos

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    // Inicializa el servicio de almacenamiento y carga los datos de los alumnos
    await this.storageService.init();
    this.alumnos = await this.storageService.obtenerTodos('alumnos');
  }

  marcarAsistencia() {
    this.router.navigate(['/scanqr']);
  }

  verMenos() {
    this.router.navigate(['/home']);
  }
}
