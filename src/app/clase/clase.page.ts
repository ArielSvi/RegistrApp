import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ClasePage {
  constructor(private router: Router) {}
  
  generarQR(seccion: string) {
    this.router.navigate(['/crearqr'], {
      state: { seccion }  // Se pasa el valor de 'seccion' en el estado
    });
  }
}
