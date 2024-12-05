import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanqrPage } from './scanqr.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import { of } from 'rxjs';

describe('ScanqrPage', () => {
  let component: ScanqrPage;
  let fixture: ComponentFixture<ScanqrPage>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock de StorageService
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['obtenerTodos', 'actualizar']);
    storageServiceSpy.obtenerTodos.and.returnValue(Promise.resolve([])); // Devuelve una lista vacía para las pruebas

    // Mock de Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy },
        AlertController, // Proveer AlertController porque se usa directamente
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request camera permission on init', () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve({} as MediaStream));
    component.ngOnInit();
    expect(component.isCameraPermissionGranted).toBe(false); // El permiso aún no se ha otorgado
  });

  it('should navigate to asistencia when volver is called', () => {
    component.volver();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/asistencia']);
  });

  it('should show an alert for entering RUT', async () => {
    const alertSpy = spyOn(component['alertController'], 'create').and.callThrough();
    await component.mostrarPopUpIngresarRut();
    expect(alertSpy).toHaveBeenCalled();
  });

  it('should call actualizar asistencia when RUT is provided', async () => {
    storageServiceSpy.obtenerTodos.and.returnValue(Promise.resolve([{ rutAlumno: '12345678-9' }]));
    const actualizarSpy = spyOn(component, 'actualizarAsistencia').and.callThrough();

    await component.actualizarAsistencia('12345678-9');
    expect(actualizarSpy).toHaveBeenCalledWith('12345678-9');
  });
});
