import { Injectable } from '@angular/core';
import { EmprendimientoAdminInterface, EmprendimientoInterface } from '../interfaces/emprendimiento';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService extends ConexionService<EmprendimientoInterface> {
  getResourceURL(): string {
    return '/Entrepreneurships';
  }
  getHomePage(): string {
    return 'emprendimiento-perfil';
  }
  getNombre(): string {
    return 'emprendimiento';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}




@Injectable({
  providedIn: 'root'
})
export class EmprendimientoAdminService extends ConexionService<EmprendimientoAdminInterface> {
  getResourceURL(): string {
    return '/Entrepreneurship_Admins';
  }
  getHomePage(): string {
    return 'emprendimiento-admins';
  }
  getNombre(): string {
    return 'Administrador de emprendimiento';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}