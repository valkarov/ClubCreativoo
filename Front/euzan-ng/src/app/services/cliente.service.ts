import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteInterface } from '../interfaces/cliente';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ConexionService<ClienteInterface> {
  getResourceURL(): string {
    return '/Clients';
  }
  getHomePage(): string {
    return 'cliente-perfil';
  }
  getNombre(): string {
    return 'Cliente';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}