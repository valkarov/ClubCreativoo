import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Taller } from 'src/app/interfaces/talleres';
import { TalleresService } from 'src/app/services/talleres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-talleres',
  templateUrl: './gestion-talleres.component.html',
  styleUrl: './gestion-talleres.component.scss'
})
export class GestionTalleresComponent {

  talleres:Taller[] = [];

  constructor(private service: TalleresService, private cookieService: CookieService){
    this.service.getSelectedList("byEntre" + "/" + this.cookieService.get("cookieEMPRENDIMIENTO")).subscribe({
      next:(data) => {
        this.talleres = data;
        console.log(this.talleres)
      }, 
      error: (err) =>{
        console.log(err)
      }
    })
  }


  redirigir(url:string) {
    window.location.href = url;
  }

  eliminarTaller(id:number){
    Swal.fire({
      title: "¿Quieres eliminar este Taller?",
      text: "¡No lo vas a poder revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next:(data)=>{
            this.service.successMessage("El taller se ha eliminado con éxito", "/dashboard-emprendimiento");
          }, error:(err) => {
            this.service.errorMessage(err.error.Message);
          }
        })
      }
    });
  }

}
