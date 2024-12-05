import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';

describe('StorageService', () => {
  let service: StorageService;
  let mockStorage: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    // Crear un mock para el servicio de Storage
    mockStorage = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);

    // Configurar el método `create` del mock para resolver una instancia ficticia
    mockStorage.create.and.returnValue(Promise.resolve(mockStorage));

    // Configurar el módulo de pruebas
    await TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useValue: mockStorage }, // Usar el mock en lugar del servicio real
      ],
    }).compileComponents();

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize storage on init', async () => {
    await service.init();
    expect(mockStorage.create).toHaveBeenCalled();
  });

  it('should store data using agregar method', async () => {
    const mockKey = 'personas';
    const mockData = { identificador: '123', nombre: 'Test User' };
    mockStorage.get.and.returnValue(Promise.resolve([]));
    mockStorage.set.and.returnValue(Promise.resolve(true));

    const result = await service.agregar(mockKey, mockData);
    expect(mockStorage.get).toHaveBeenCalledWith(mockKey);
    expect(mockStorage.set).toHaveBeenCalledWith(mockKey, [mockData]);
    expect(result).toBeTrue();
  });

  it('should retrieve data using obtenerDato method', async () => {
    const mockKey = 'personas';
    const mockData = [
      { identificador: '123', nombre: 'User 1' },
      { identificador: '456', nombre: 'User 2' },
    ];
    mockStorage.get.and.returnValue(Promise.resolve(mockData));

    const result = await service.obtenerDato(mockKey, '123');
    expect(mockStorage.get).toHaveBeenCalledWith(mockKey);
    expect(result).toEqual(mockData[0]);
  });

  it('should update data using actualizar method', async () => {
    const mockKey = 'personas';
    const mockData = [{ identificador: '123', nombre: 'Updated User' }];
    mockStorage.set.and.returnValue(Promise.resolve());

    await service.actualizar(mockKey, mockData);
    expect(mockStorage.set).toHaveBeenCalledWith(mockKey, mockData);
  });

  it('should retrieve all data using obtenerTodos method', async () => {
    const mockKey = 'personas';
    const mockData = [
      { identificador: '123', nombre: 'User 1' },
      { identificador: '456', nombre: 'User 2' },
    ];
    mockStorage.get.and.returnValue(Promise.resolve(mockData));

    const result = await service.obtenerTodos(mockKey);
    expect(mockStorage.get).toHaveBeenCalledWith(mockKey);
    expect(result).toEqual(mockData);
  });
});
