import { Injectable } from '@angular/core';
import { OrdenesInterface } from '../interfaces/ordenes';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService extends ConexionService<OrdenesInterface> {
  getResourceURL(): string {
    return '/Orders';
  }
  getHomePage(): string {
    return '';
  }
  getNombre(): string {
    return '';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}