import { Injectable } from '@angular/core';
import { TempPassInterface } from '../interfaces/temp_pass';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TempPassService extends ConexionService<TempPassInterface>{
  getResourceURL(): string {
    return '/Temp_Pass';
  }
  getHomePage(): string {
    return 'temporal';
  }
  getNombre(): string {
    return 'temporal';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}