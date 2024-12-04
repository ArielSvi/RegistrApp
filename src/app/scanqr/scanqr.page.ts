import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular'; // Importar AlertController
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { StorageService } from 'src/app/storage.service';
import { Router } from '@angular/router';

interface Alumno {
  rutAlumno: string;
  asistenciaAlumno: string;
  fechaAlumno: string;
  seccionAlumno: string;
}

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ScanqrPage implements OnInit, OnDestroy {
  scannerResult: string | null = null;
  private html5QrCode: Html5QrcodeScanner | null = null;
  isCameraPermissionGranted: boolean = false;
  estadoAsistencia: string = 'Presente';
  fecha: any;
  seccion: any;

  constructor(
    private storageservice: StorageService,
    private router: Router,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit() {
    this.requestCameraPermission();
    this.fecha = this.formatearFecha(new Date());
  }

  formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
  }

  volver() {
    this.router.navigate(['/asistencia']);
  }

  requestCameraPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.isCameraPermissionGranted = true;
          this.startScanner();
        })
        .catch((error) => {
          alert("Error al solicitar permisos de cámara");
        });
    } else {
      alert("El navegador no soporta el acceso a la cámara");
    }
  }

  startScanner() {
    const config = {
      fps: 1,
      qrbox: 250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    this.html5QrCode = new Html5QrcodeScanner("reader", config, false);

    this.html5QrCode.render(async (result) => {
      this.scannerResult = result;
      this.seccion = result; // Asumimos que el resultado contiene la sección
      console.log("Resultado del scanner:", result);

      // Mostrar pop-up para que el usuario ingrese el RUT
      await this.mostrarPopUpIngresarRut();
    }, (error) => {
      console.warn("Error al escanear el código QR", error);
    });
  }

  // Mostrar pop-up para ingresar el RUT
  async mostrarPopUpIngresarRut() {
    const alert = await this.alertController.create({
      header: 'Ingrese RUT',
      inputs: [
        {
          name: 'rut',
          type: 'text',
          placeholder: 'Ingrese el RUT del alumno'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Ingreso de RUT cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            if (data.rut) {
              // Usar el RUT ingresado para actualizar la asistencia
              await this.actualizarAsistencia(data.rut);
            } else {
              
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Actualizar la asistencia del alumno
  async actualizarAsistencia(rutIngresado: string) {
    // Obtener la lista de alumnos
    let alumnos: Alumno[] = await this.storageservice.obtenerTodos('alumnos');
  
    // Buscar al alumno que coincida con el RUT ingresado
    let alumno = alumnos.find((al: Alumno) => al.rutAlumno === rutIngresado);
  
    if (alumno) {
      // Actualizar los valores del alumno
      alumno.asistenciaAlumno = this.estadoAsistencia;
      alumno.fechaAlumno = this.fecha; // Actualizar con la fecha actual
      alumno.seccionAlumno = this.seccion; // Actualizar con la sección del QR
  
      // Guardar la lista actualizada de alumnos
      await this.storageservice.actualizar('alumnos', alumnos);
  
      console.log("Asistencia actualizada para el alumno:", alumno);
    } else {
      alert("Alumno no encontrado con el RUT proporcionado.");
    }
  }

  ngOnDestroy() {
    if (this.html5QrCode) {
      this.html5QrCode.clear();
    }
  }
}
