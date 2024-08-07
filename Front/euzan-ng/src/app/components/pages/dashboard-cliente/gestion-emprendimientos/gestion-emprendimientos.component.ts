import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Emprendimiento, EmprendimientoAdmin } from 'src/app/interfaces/emprendimiento';
import { EmprendimientoAdminService, EmprendimientoService } from 'src/app/services/emprendimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-emprendimientos',
  templateUrl: './gestion-emprendimientos.component.html',
  styleUrl: './gestion-emprendimientos.component.scss'
})
export class GestionEmprendimientosComponent{

  emprendimientos:EmprendimientoAdmin[] = [];
  admin:EmprendimientoAdmin = new EmprendimientoAdmin;
  infoEmprendimientos:Emprendimiento[] = []

  constructor(private service: EmprendimientoAdminService, private EmprendimientoService:EmprendimientoService ,private cookieService: CookieService){
    this.service.getSelectedList("byClient" + "/" + this.cookieService.get("cookieCLIENTE")).subscribe({
      next:(data) => {
        this.emprendimientos = data;
        console.log(this.emprendimientos)

        this.EmprendimientoService.getList().subscribe({
          next:(data) => {
            this.infoEmprendimientos = data;
            console.log(this.infoEmprendimientos)


            this.infoEmprendimientos = this.infoEmprendimientos.filter(info => 
              this.emprendimientos.some(emp => emp.IdEntrepreneurship === info.Username)
            );
          }, 
          error: (err) =>{
            console.log(err)
          }
        })



      }, 
      error: (err) =>{
        console.log(err)
      }
    })
    


  }

  esPendiente(id: string): boolean {
    const emprendimiento = this.emprendimientos.find(emp => emp.IdEntrepreneurship === id);
    return emprendimiento ? emprendimiento.state === 'Pendiente' : false;
  }


  redirigir(url:string) {
    window.location.href = url;
  }

  ingresarEmprendimeinto(user:string){
    Swal.fire({
      title: "¿Quieres cambiar a este perfil de emprendimiento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cambiar de cuenta!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cookieService.set('cookieEMPRENDIMIENTO', user);
        this.service.successMessage("¡Bienvenido a tu cuenta de emprendedor!", "/ingresar")
      }
    });
  }

  aceptarSolicitud(user:string){
    Swal.fire({
      title: "¿Quieres aceptar la solicitud de administración para este emprendimiento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.IdClient = this.cookieService.get("cookieCLIENTE");
        this.admin.IdEntrepreneurship = user;
        this.admin.state = "Aceptado"
        console.log(this.admin)
        this.service.update(this.admin.IdEntrepreneurship, this.admin).subscribe({
          next:(data) =>{
            this.service.successMessage("Solucitud Aceptada", "/mis-emprendimientos")
          }, error:(err) => {
            this.service.errorMessage(err.error.Message);
          }
        })
      }
    });
  }

  rechazarSolicitud(user:string){
    Swal.fire({
      title: "¿Quieres recahzar la solicitud de administración para este emprendimiento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.IdClient = this.cookieService.get("cookieCLIENTE");
        this.admin.IdEntrepreneurship = user;
        this.admin.state = "Rechazado"
        this.service.update(this.admin.IdEntrepreneurship, this.admin).subscribe({
          next:(data) =>{
            this.service.successMessage("Solucitud Rechazada", "/mis-emprendimientos")
          }, error:(err) => {
            this.service.errorMessage(err.error.Message);
          }
        })
      }
    });
  }


  eliminarSolicitud(user:string){
    Swal.fire({
      title: "¿Quieres eliminar la solicitud de administración para este emprendimiento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        const e = this.infoEmprendimientos.find(emprendimiento => emprendimiento.Username === user);

        this.EmprendimientoService.delete(e.IdEntrepreneurship).subscribe({
          next:(data) =>{
            this.service.successMessage("Solicitud Eliminada", "/mis-emprendimientos")
          }, error:(err) => {
            this.service.errorMessage(err.error.Message);
          }
        })
      }
    });
  }

}
