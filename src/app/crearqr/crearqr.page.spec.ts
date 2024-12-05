import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearqrPage } from './crearqr.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

describe('CrearqrPage', () => {
  let component: CrearqrPage;
  let fixture: ComponentFixture<CrearqrPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule, QRCodeModule],
      providers: [
        {
          provide: Router,
          useValue: { getCurrentNavigation: jasmine.createSpy().and.returnValue({ extras: { state: { seccion: 'Test Section' } } }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el valor inicial de qrData como una cadena vacía', () => {
    expect(component.qrData).toBe('');
  });

  it('debe asignar qrData a createCode cuando se llama a generateQRCode', () => {
    component.qrData = 'Nuevo código QR';
    component.generateQRCode();
    expect(component.createdCode).toBe('Nuevo código QR');
  });

  it('no debería mostrar el código QR inicialmente', () => {
    component.createdCode = '';  // Asegura que no hay QR antes de la generación
    fixture.detectChanges();
    const qrCodeElement = fixture.nativeElement.querySelector('qrcode');
    expect(qrCodeElement).toBeNull();  // No debe haber un código QR antes de generar uno
  });

  it('debería actualizar el código creado cuando se llama a generar QRCode', () => {
    component.qrData = 'Nuevo valor para QR';
    component.generateQRCode();
    expect(component.createdCode).toBe('Nuevo valor para QR');
  });
});
