import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaPage } from './asistencia.page';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

describe('AsistenciaPage', () => {
  let component: AsistenciaPage;
  let fixture: ComponentFixture<AsistenciaPage>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock del servicio StorageService
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['init', 'obtenerTodos']);
    storageServiceSpy.init.and.returnValue(Promise.resolve());
    storageServiceSpy.obtenerTodos.and.returnValue(Promise.resolve([])); // Lista vacía por defecto

    // Mock del servicio Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize storage and fetch alumnos on ngOnInit', async () => {
    const alumnosMock = [
      {
        nombreAlumno: 'Juan Perez',
        rutAlumno: '12345678-9',
        carreraAlumno: 'Ingeniería',
        asistenciaAlumno: 'Presente',
        seccionAlumno: 'A',
        fechaAlumno: '01/01/2024',
        identificadorAlumno: '1',
      },
    ];
    storageServiceSpy.obtenerTodos.and.returnValue(Promise.resolve(alumnosMock));

    await component.ngOnInit();

    expect(storageServiceSpy.init).toHaveBeenCalled();
    expect(storageServiceSpy.obtenerTodos).toHaveBeenCalledWith('alumnos');
    expect(component.alumnos).toEqual(alumnosMock);
  });

  it('should navigate to scanqr when marcarAsistencia is called', () => {
    component.marcarAsistencia();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/scanqr']);
  });

  it('should navigate to home when verMenos is called', () => {
    component.verMenos();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
