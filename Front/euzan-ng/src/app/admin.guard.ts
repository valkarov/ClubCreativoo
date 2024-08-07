import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  redirect(flag:boolean):any {
    if(!flag){
      this.router.navigate(['/', 'ingresar'])
    }
  }

  canActivate(): boolean {
    const cookie = this.cookieService.check('cookieADMIN')
    this.redirect(cookie)
    return cookie
  }
}
