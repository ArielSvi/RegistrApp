import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { AsistenciaPage } from './asistencia/asistencia.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'asistencia',
    loadComponent: () => import('./asistencia/asistencia.page').then(m => m.AsistenciaPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'crearqr',
    loadComponent: () => import('./crearqr/crearqr.page').then( m => m.CrearqrPage)
  },
  {
    path: 'scanqr',
    loadComponent: () => import('./scanqr/scanqr.page').then( m => m.ScanqrPage)
  },
  {
    path: 'agregar-user',
    loadComponent: () => import('./agregar-user/agregar-user.page').then( m => m.AgregarUserPage)
  },
  {
    path: 'clase',
    loadComponent: () => import('./clase/clase.page').then( m => m.ClasePage)
  },
 

];
