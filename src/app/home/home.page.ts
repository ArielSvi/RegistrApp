import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage implements OnInit {

  usuario:any;
  role:any;

  constructor(private router: Router, private animationCtrl: AnimationController) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state){

      this.usuario = navigation.extras.state['nombre']
      this.role = navigation.extras.state['rol']
      
    }else{
      alert('No se pudo establecer el state de Navigation')
    }
  }

  

  

  private animateWelcome() {
    const welcome = document.querySelector('#bienvenida-cont');
    if (welcome) {
      this.animationCtrl.create()
        .addElement(welcome)
        .duration(1000)
        .fromTo('transform', 'translateY(-100%)', 'translateY(0)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }

  private animateLorem() {
    const loremContent = document.querySelector('#lorem-cont');
    if (loremContent) {
      this.animationCtrl.create()
        .addElement(loremContent)
        .duration(1000)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }

  private animateLogo() {
    const logo = document.querySelector('#logo-perfil-cont');
    if (logo) {
      this.animationCtrl.create()
        .addElement(logo)
        .duration(1000)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }

  private animateImage() {
    const image = document.querySelector('#imagen-cont');
    if (image) {
      this.animationCtrl.create()
        .addElement(image)
        .duration(1000)
        .fromTo('opacity', '0', '1')
        .play();
    }
  }

  private animateCalendar() {
    const calendar = document.querySelector('#calendario-cont');
    if (calendar) {
      this.animationCtrl.create()
        .addElement(calendar)
        .duration(1000)
        .fromTo('transform', 'translateY(100%)', 'translateY(0)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ionViewWillEnter() {
    this.animateWelcome();
    this.animateLorem();
    this.animateLogo();
    this.animateImage();
    this.animateCalendar();
  }
}
