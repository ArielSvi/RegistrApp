import { Injectable } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [];
  private storage: Storage | null = null;

  constructor(private storageInstance: Storage) { 
    this.init();
  }

  async init() {
    if (!this.storage) {
      this.storage = await this.storageInstance.create();
    }
  }

  async obtenerDato(key: string, identificador: string) {
    this.datos = await this.storage?.get(key) || [];
    return this.datos.find(valor => valor.identificador === identificador);
  }

  async actualizar(key: string, datos: any[]): Promise<void> {
    await this.storage?.set(key,datos);
  }

  async agregar(key: string, jsonAgregar: any) {
    this.datos = await this.storage?.get(key) || [];
    let existe = await this.obtenerDato(key, jsonAgregar.identificador);
  
    if (!existe) {
      this.datos.push(jsonAgregar);
      await this.storage?.set(key, this.datos);
      console.log('Usuario almacenado:', jsonAgregar); // Debug: Ver el usuario que se almacena
      return true;
    }
    return false;
  }
  
  async obtenerTodos(key: string) {
    const datos = await this.storage?.get(key) || [];
    console.log('Usuarios almacenados:', datos); // Debug: Ver los usuarios almacenados
    return datos;
  }
  
}
