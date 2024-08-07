import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/interfaces/role';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    rol = new Role()
    unregistered = false;
    logo:string = "assets/img/Club Creativo Logo Blanco.png"

    constructor(private viewportScroller: ViewportScroller, private cookieService: CookieService) {
        if (cookieService.get("cookieADMIN") !="") {
            this.rol.Type = "ADMIN"
            this.rol.Username = cookieService.get("cookieADMIN")
            this.logo = "assets/img/Club Creativo Administrador.png"
      
          } else if (cookieService.get("cookieEMPRENDIMIENTO") !="") {
            this.rol.Type = "EMPRENDIMIENTO"
            this.rol.Username = cookieService.get("cookieEMPRENDIMIENTO")
            this.logo = "assets/img/Club Creativo Emprendedor.png"
      
          } else if (cookieService.get("cookieCLIENTE") !="") {
            this.rol.Type = "CLIENTE"
            this.rol.Username = cookieService.get("cookieCLIENTE")
            this.logo = "assets/img/Club Creativo Cliente.png"
      
          } else if (cookieService.get("cookieREPARTIDOR") !="") {
            this.rol.Type = "REPARTIDOR"
            this.rol.Username = cookieService.get("cookieREPARTIDOR")
            this.logo = "assets/img/Club Creativo Repartidor.png"
          } else {
            this.unregistered = true;
            this.logo = "assets/img/Club Creativo Logo Blanco.png"
          }
          
          const currentPath = window.location.pathname;
          if (currentPath === '/ingresar') {
            this.unregistered = false; 
          }
    }

    public onClick(mainpage:string, elementId: string): void { 
      const currentPath = window.location.pathname;
      if (currentPath != mainpage) {
        this.redirigir(mainpage)
      }
        this.viewportScroller.scrollToAnchor(elementId);
    }

    ngOnInit() {}

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }


    volverCuenta(){

        Swal.fire({
          title: "¿Quieres cambiar a tu cuenta de Cliente?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cambiar de cuenta!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.cookieService.delete("cookieEMPRENDIMIENTO");
            this.redirigir("/dashboard-cliente");
          }
        });
        
      }
    
      logOut(){
        Swal.fire({
          title: "¿Quieres salir de tu cuenta en Club Creativo?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Salir"
        }).then((result) => {
          if (result.isConfirmed) {
            this.cookieService.delete("cookieREPARTIDOR");
            this.cookieService.delete("cookieCLIENTE");
            this.cookieService.delete("cookieEMPRENDIMIENTO");
            this.cookieService.delete("cookieADMIN");
            this.redirigir("/inicio");
          }
        });
      }

      redirigir(url:string) {
        window.location.href = url;
      }

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

}