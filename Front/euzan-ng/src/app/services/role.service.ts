import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { RoleInterface } from '../interfaces/role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ConexionService<RoleInterface>{
  getResourceURL(): string {
    return '/Roles';
  }
  getHomePage(): string {
    return 'role?';
  }
  getNombre(): string {
    return 'role?';
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
export class AuthService {


  constructor(
    private httpClient:HttpClient
  ) {
  }

  public signOutExternal = () =>{
    localStorage.removeItem("token");
    console.log("token deleted")
  }

  LoginWithGoogle(credentials:string):Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post("https://localhost:44301/api/" + "LoginWithGoogle", JSON.stringify(credentials), {headers: header});
  }
}


