import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearqrPage } from './crearqr.page';

describe('CrearqrPage', () => {
  let component: CrearqrPage;
  let fixture: ComponentFixture<CrearqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});