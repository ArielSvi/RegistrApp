import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ForgotPasswordPage {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Definir el formulario con controles 'rut' y 'password'
    this.loginForm = this.fb.group({
      rut: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]*$'), // Validación para números solamente
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'), // Validación para números solamente
        ]
      ]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const rut = this.loginForm.get('rut')?.value;
      const password = this.loginForm.get('password')?.value;

      console.log('RUT:', rut, 'Contraseña:', password);
      // Aquí se puede implementar la lógica de envío o cambio de contraseña
      this.router.navigate(['login'], { queryParams: { rut, password } });
    } else {
      console.error('Formulario no válido');
    }
  }
}
