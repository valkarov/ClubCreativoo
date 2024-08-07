import { Injectable } from '@angular/core';
import { PreguntaInterface } from '../interfaces/pregunta';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService extends ConexionService<PreguntaInterface> {
  getResourceURL(): string {
    return '/Questions';
  }
  getHomePage(): string {
    return 'preguntas';
  }
  getNombre(): string {
    return 'pregunta';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}
