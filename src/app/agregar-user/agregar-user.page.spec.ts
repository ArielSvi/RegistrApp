import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUserPage } from './agregar-user.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/storage.service';

describe('AgregarUserPage', () => {
  let component: AgregarUserPage;
  let fixture: ComponentFixture<AgregarUserPage>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear mocks de StorageService y Router
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['init', 'agregar', 'obtenerTodos']);
    storageServiceSpy.init.and.returnValue(Promise.resolve());
    storageServiceSpy.agregar.and.returnValue(Promise.resolve(true));
    storageServiceSpy.obtenerTodos.and.returnValue(Promise.resolve([{ nombre: 'Test User', rut: '123456789', nivel: 'Alumno' }]));

    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'getCurrentNavigation']);
    routerSpy.getCurrentNavigation.and.returnValue(null); // Simula un valor de retorno válido

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize storage on ngOnInit', async () => {
    await component.ngOnInit();

    expect(storageServiceSpy.init).toHaveBeenCalled(); // Asegura que se llame a init
    
  });
});
