import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/storage.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        LoginPage, // Agregas la página como standalone
      ],
      providers: [
        { provide: StorageService, useValue: jasmine.createSpyObj('StorageService', ['get', 'set']) }, // Mock para el servicio
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ username: 'testUser', password: '123456', role: 'Admin' }), // Simulación de parámetros de consulta
          },
        }, // Mock para ActivatedRoute
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear la página de Login', () => {
    expect(component).toBeTruthy();
  });

});
