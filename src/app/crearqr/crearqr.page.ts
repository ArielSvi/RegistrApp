import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-crearqr',
  templateUrl: './crearqr.page.html',
  styleUrls: ['./crearqr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeModule]
})
export class CrearqrPage implements OnInit {

  qrData: string = '';  // Valor del código QR que generaremos
  createdCode: string = '';  // Almacenará la URL o el valor del QR final
  section: string = '';  // Sección recibida desde la navegación

  constructor(private router: Router) { }

  ngOnInit() {
    // Obtener el valor de 'seccion' desde el state de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.section = navigation.extras.state['seccion'];
      
      // Si la sección es válida, la usamos para el código QR
      if (this.section) {
        this.createdCode = navigation.extras.state['seccion'];;
        console.log('Sección recibida:', this.section);
      } else {
        console.warn('La sección no es válida o está vacía');
      }
    } else {
      console.warn('No se pudo obtener el valor de la sección');
    }
  }

  // Función para volver a la página de asistencia
  volverAsistencia() {
    this.router.navigate(['/clase']);
  }

  // Método para actualizar el QR con los datos ingresados por el usuario
  generateQRCode() {
    if (this.qrData) {
      this.createdCode = this.qrData;  // Usar el valor de qrData proporcionado por el usuario
    } else {
      console.warn('No se ha proporcionado un valor para el código QR');
    }
  }
}
