import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import { CommonModule } from '@angular/common';

interface Persona {
  nombre: string;
  rut: string;
  nivel: string;
  pass: string;
  identificador: string;
}

interface Alumno {
  nombreAlumno: string;
  rutAlumno: string;
  carreraAlumno: string;
  asistenciaAlumno: string;
  identificador: string;
  seccionAlumno: string;
  fechaAlumno: string;
}

@Component({
  selector: 'app-agregar-user',
  templateUrl: 'agregar-user.page.html',
  styleUrls: ['agregar-user.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})

export class AgregarUserPage implements OnInit {
  nombre: string = '';
  rut: string = '';
  nivel: any = '';
  pass: string = '';
  carrera: string = '';

  nombreAlumno: string = '';
  rutAlumno: string = '';
  carreraAlumno: any = '';
  asistenciaAlumno: any = 'Ausente';
  seccionAlumno: any = '';
  fechaAlumno:any = '';

  // Variables de error
  nombreError: string = '';
  rutError: string = '';
  passError: string = '';
  nivelError: string = '';

  // Variables para CRUD
  personas: Persona[] = [];
  alumnos: Alumno[] = [];

  currentId: string = ''; // Variable para almacenar el identificador

  constructor(
    private router: Router,
    private storageservice: StorageService
  ) {}




  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    await this.storageservice.init();
    this.listar();
  }

  validateNombre() {
    this.nombreError = this.nombre.trim() ? '' : 'El nombre es obligatorio';
  }

  validateRut() {
    this.rutError = this.rut && this.rut.toString().length === 9
      ? ''
      : 'El rut debe tener exactamente 9 dígitos';
  }
  
  validatePass() {
    this.passError = this.pass && this.pass.toString().length === 6
      ? ''
      : 'La contraseña debe tener 6 dígitos';
  }
  

  validateNivel() {
    this.nivelError = this.nivel ? '' : 'El nivel es obligatorio';
  }
  
  agregar(datito:string){
    if(datito === 'Alumno'){
      this.agregarAlumno();
      this.agregarUser();
    }else{
      this.agregarUser();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async agregarUser() {
    const nuevaPersona = {
      nombre: this.nombre,
      rut: this.rut.toString(), // Convertir rut a cadena
      nivel: this.nivel,
      pass: this.pass.toString(), // Convertir password a cadena
      identificador: Date.now().toString()
    };
  
    this.personas.push(nuevaPersona);
    let resp = await this.storageservice.agregar('personas', nuevaPersona);
  
    if (resp) {
      alert('Persona Agregada');
      await this.listar();
    } else {
      alert('Error no se pudo agregar');
    }
    
    

    // Limpiar los campos del formulario
    this.nombre = "";
    this.rut = "";
    this.pass = "";
    this.nivel = "";
  }

  async agregarAlumno() {
    const nuevoAlumno = {
      nombreAlumno: this.nombre,
      rutAlumno: this.rut.toString(),
      carreraAlumno: this.carrera,
      asistenciaAlumno: this.asistenciaAlumno,
      seccionAlumno: this.seccionAlumno,
      fechaAlumno: this.fechaAlumno,
      identificador: Date.now().toString()
    };
  
    this.alumnos.push(nuevoAlumno);
    let resp = await this.storageservice.agregar('alumnos', nuevoAlumno);
  
    if (resp) {
      alert('Alumno Agregado');
      await this.listar();
    } else {
      alert('Error: No se pudo agregar o ya existe');
    }
  
    // Limpiar los campos del formulario
    this.nombre = "";
    this.rut = "";
    this.carrera = "";
    this.pass = "";
    this.nivel = "";
  }
  

  async listar() {
    this.personas = await this.storageservice.obtenerTodos('personas');
    this.alumnos = await this.storageservice.obtenerTodos('alumnos');
    console.log('Personas:', this.personas);
    console.log('Alumnos:', this.alumnos);
  }
}
