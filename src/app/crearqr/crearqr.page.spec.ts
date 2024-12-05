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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the initial value of qrData as an empty string', () => {
    expect(component.qrData).toBe('');
  });

  it('should assign qrData to createdCode when generateQRCode is called', () => {
    component.qrData = 'Nuevo código QR';
    component.generateQRCode();
    expect(component.createdCode).toBe('Nuevo código QR');
  });

  it('should not display QR code initially', () => {
    component.createdCode = '';  // Asegura que no hay QR antes de la generación
    fixture.detectChanges();
    const qrCodeElement = fixture.nativeElement.querySelector('qrcode');
    expect(qrCodeElement).toBeNull();  // No debe haber un código QR antes de generar uno
  });

  it('should update createdCode when generateQRCode is called', () => {
    component.qrData = 'Nuevo valor para QR';
    component.generateQRCode();
    expect(component.createdCode).toBe('Nuevo valor para QR');
  });
});
