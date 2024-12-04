import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserService } from '../user.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage {

  loginForm!: FormGroup;
  par_username: string = '';
  par_password: string = '';
  par_role: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9 ]*$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$')
        ]
      ],
      role: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value.toString(); // Asegúrate de que el password sea una cadena
      const role = this.loginForm.get('role')?.value;
      
      if(username == 'Admin' && password == '123456' && role == 'Admin'){
        this.router.navigate(['/agregar-user']);
      }

      // Obtener todos los usuarios desde StorageService
      const usuarios = await this.storageService.obtenerTodos('personas');
  
      // Busca un usuario que coincida con username, password y role
      const usuarioValido = usuarios.find((user: any) =>
        user.nombre === username &&
        user.pass === password && // Comparar password como cadena
        user.nivel === role
      );
  
      if (usuarioValido) {
        let navigationExtras: NavigationExtras = {
          state: {
            nombre: username,
            rol: role
          }
        };
      
        // Utiliza el operador de comparación (===) y corrige el uso de else if
        if (role === 'Admin') {
          this.router.navigate(['agregar-user'], navigationExtras);
        } else if (role === 'Docente') {
          this.router.navigate(['home'], navigationExtras);
        } else if (role === 'Alumno') {
          this.router.navigate(['home'], navigationExtras);
        }
      } else {
        alert('Usuario o contraseña incorrecta');
      }

    } else {
      console.error('Formulario no válido');
    }
  }
  
  

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  ionViewWillEnter() {
    this.loginForm.reset();
    this.route.queryParams.subscribe(params => {
      this.par_username = params['username'] || '';
      this.par_password = params['password'] || '';
      this.par_role = params['role'] || '';
    });
  }
}
