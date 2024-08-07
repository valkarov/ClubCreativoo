import { Injectable } from '@angular/core';
import { SocialInterface, SocialTypeInterface } from '../interfaces/social';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class SocialTypeService extends ConexionService<SocialTypeInterface>{
  getResourceURL(): string {
    return '/Social_Type';
  }
  getHomePage(): string {
    return 'social type';
  }
  getNombre(): string {
    return 'social type';
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
export class SocialService extends ConexionService<SocialInterface>{
  getResourceURL(): string {
    return '/Socials';
  }
  getHomePage(): string {
    return 'socials';
  }
  getNombre(): string {
    return 'socials';
  }

  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}