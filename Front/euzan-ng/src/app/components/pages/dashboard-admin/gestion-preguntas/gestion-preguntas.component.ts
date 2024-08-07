import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-preguntas',
  templateUrl: './gestion-preguntas.component.html',
  styleUrl: './gestion-preguntas.component.scss'
})
export class GestionPreguntasComponent {
  preguntas:Pregunta[] = []

  constructor(private service: PreguntasService, private route:Router, private rou:ActivatedRoute){
    this.service.getList().subscribe({
      next:(data) => {
        this.preguntas = data;
        console.log(this.preguntas)
      }, 
      error: (err) =>{
        console.log(err)
      }
    })
  }

  eliminarPregunta(id:number){
    Swal.fire({
      title: "¿Quieres eliminar esta Pregunta?",
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
            this.service.successMessage("La pregunta se ha eliminado correctamente", "/dashboard-admin");
          }, error:(err) => {
            this.service.errorMessage(err.error.Message);
          }
        })
      }
    });
  }


  redirigir(url:string) {
    window.location.href = url;
  }
}
