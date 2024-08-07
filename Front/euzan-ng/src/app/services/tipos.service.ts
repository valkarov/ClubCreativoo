import { Injectable } from '@angular/core';
import { TiposInterface } from '../interfaces/tipos';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TiposService extends ConexionService<TiposInterface> {
  getResourceURL(): string {
    return '/Entrepreneurship_Type';
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