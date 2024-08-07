import { Injectable } from '@angular/core';
import { AdministradorInterface } from '../interfaces/administrador';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService extends ConexionService<AdministradorInterface> {
  getResourceURL(): string {
    return '/Admins';
  }
  getHomePage(): string {
    return 'solicitudes';
  }
  getNombre(): string {
    return 'Administrador';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}