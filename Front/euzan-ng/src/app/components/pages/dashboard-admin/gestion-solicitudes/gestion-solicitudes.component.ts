import { Component } from '@angular/core';
import { Emprendimiento } from 'src/app/interfaces/emprendimiento';
import { Social } from 'src/app/interfaces/social';
import { EmprendimientoService } from 'src/app/services/emprendimiento.service';
import { SocialService } from 'src/app/services/social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrl: './gestion-solicitudes.component.scss'
})
export class GestionSolicitudesComponent {

  solicitudes:Emprendimiento[] = [];
  objeto: Emprendimiento = new Emprendimiento();
  sociales: Social[] = []

  constructor(
    private service: EmprendimientoService, 
    private socialService: SocialService){
    this.service.getSelectedList("Solicitudes").subscribe({
      next:(data) => {
        this.solicitudes = data;
        console.log(this.solicitudes)
      }, 
      error: (err) =>{
        console.log(err)
      }
    })
  }


  redirigir(url:string) {
    window.location.href = url;
  }

  aceptarSolicitud(obj:Emprendimiento){
    Swal.fire({
      title: "¿Quieres Aceptar esta solicitud?",
      text: "¡No lo vas a poder revertir!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.objeto = obj;
        this.objeto.State = "Aceptada";
        this.gestionarSolicitud();
      }
    });
  }
  rechazarSolicitud(obj) {
    Swal.fire({
      title: "¿Quieres Rechazar esta solicitud?",
      text: "¡No lo vas a poder revertir!",
      input: 'textarea',
      inputPlaceholder: 'Escribe la razón de rechazo aquí...',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar",
      cancelButtonText: "Cancelar",
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage('Por favor, escribe una razón para el rechazo');
        }
        return reason;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.objeto = obj;
        this.objeto.State = "Rechazada";
        this.objeto.Reason = result.value; // Guardar la razón de rechazo
        this.gestionarSolicitud();
      }
    });
  }

  verMas(obj:Emprendimiento){
    this.socialService.getSelectedList("byUser/" + obj.Username).subscribe({
      next:(data) =>{
        this.sociales = data
        let socialLinksHtml = '';
  this.sociales.forEach(item => {
    socialLinksHtml += `
      <div style="width: calc(20% - 10px); padding-top: calc(20% - 10px); position: relative; margin-bottom: 20px;">
        <a href="${item.Link}" target="_blank">
          <img src="assets/img/${item.Type}.png" alt="${item.Type}" style="width: 100%; height: 100%; object-fit: cover;">
        </a>
      </div>
    `;
  });

  // Abrir SweetAlert con el contenido dinámico
  Swal.fire({
    title: `<strong>${obj.Name}</strong>`,
    html: `
      <p><strong>Lugar:</strong> ${obj.District}, ${obj.Canton}, ${obj.Province}</p>
      <p><strong>Tipo de negocio:</strong> ${obj.Type}</p>
      <p><strong>Teléfono:</strong> ${obj.Phone}</p>
      <p><strong>SINPE:</strong> ${obj.Sinpe}</p>
      <p><strong>Correo:</strong> ${obj.Email}</p>
      <p><strong>Descripción:</strong> ${obj.Description}</p>
      <div style="display: flex; justify-content: space-evenly; width: 100%; margin: 0 auto;">
        ${socialLinksHtml}
      </div>
    `,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText: 'Cerrar',
  });





      }, 
      error:(err) =>{
        console.log(err)
      }
    })
  }

  gestionarSolicitud(){
    this.service.update(this.objeto.IdEntrepreneurship, this.objeto).subscribe({
      next:(data) => {
        Swal.fire({
          title: this.objeto.State + "!",
          text: "Solicitud Gestionada exitosamente",
          icon: "success",
          didClose: () => {
            window.location.reload();
          }
        });
      }, 
      error:(err) => {
        console.log(err)
      }
    })
  }
}
