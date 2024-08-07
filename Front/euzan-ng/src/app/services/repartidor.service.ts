import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RepartidorInterface } from '../interfaces/repartidor';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class RepartidorService extends ConexionService<RepartidorInterface> {
  getResourceURL(): string {
    return '/Delivery_Person';
  }
  getHomePage(): string {
    return 'repartidor-perfil';
  }
  getNombre(): string {
    return 'Repartidor';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}