import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Taller } from 'src/app/interfaces/talleres';
import { TalleresService } from 'src/app/services/talleres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-taller',
  templateUrl: './agregar-taller.component.html',
  styleUrl: './agregar-taller.component.scss'
})
export class AgregarTallerComponent {

  objeto:Taller = new Taller();
  editMode:boolean = true;

  constructor(private service:TalleresService, private route:Router, private rou:ActivatedRoute, private cookieService: CookieService) {
    if(this.rou.snapshot.params['id']==undefined){
      this.editMode = false
    } else {
      this.service.get(this.rou.snapshot.params['id']).subscribe({
        next:(data) =>{
          this.objeto = data
        }, error:(err) => {
          console.log(err)
        }
      })
    }
  }

  redirigir(url:string) {
    Swal.fire({
      title: "¿Quieres dejar de editar?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = url;
      }
    });
  }

  guardar(){
      Swal.fire({
        title: "¿Quieres añadir este Taller?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.objeto)
          if (this.editMode){
            this.service.update(this.objeto.IdWorkshop, this.objeto).subscribe({
              next:(data) => {
                this.service.successMessage("Taller correctamente modificado", "/dashboard-emprendimiento");
              }, error:(err) => {
                this.service.errorMessage(err.error.Message);
              } 
            })
          } else {
            this.objeto.IdEntrepreneurship = this.cookieService.get("cookieEMPRENDIMIENTO");
            this.objeto.IdWorkshop = 1;
            this.service.add(this.objeto).subscribe({
              next:(data) => {
                this.service.successMessage("Taller correctamente añadido", "/dashboard-emprendimiento");
              }, error:(err) => {
                console.log(err)
                this.service.errorMessage(err.error.Message);
              } 
            })
          }
        }
      });
  }

}
