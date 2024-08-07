import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CantonInterface, DistritoInterface, ProvinciaInterface } from '../interfaces/lugares';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends ConexionService<ProvinciaInterface> {
  getResourceURL(): string {
    return '/Provinces';
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



@Injectable({
  providedIn: 'root'
})
export class CantonService extends ConexionService<CantonInterface> {
  getResourceURL(): string {
    return '/Cantons';
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



@Injectable({
  providedIn: 'root'
})
export class DistritoService extends ConexionService<DistritoInterface> {
  getResourceURL(): string {
    return '/Districs';
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
