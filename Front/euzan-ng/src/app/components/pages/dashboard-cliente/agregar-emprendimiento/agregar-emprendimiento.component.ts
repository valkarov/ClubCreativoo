import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Emprendimiento, EmprendimientoAdmin } from 'src/app/interfaces/emprendimiento';
import { Province, Canton, Distrito } from 'src/app/interfaces/lugares';
import { Social } from 'src/app/interfaces/social';
import { Tipos } from 'src/app/interfaces/tipos';
import { EmprendimientoService, EmprendimientoAdminService } from 'src/app/services/emprendimiento.service';
import { ProvinciaService, CantonService, DistritoService } from 'src/app/services/lugares.service';
import { SocialService } from 'src/app/services/social.service';
import { TiposService } from 'src/app/services/tipos.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-agregar-emprendimiento',
  templateUrl: './agregar-emprendimiento.component.html',
  styleUrl: './agregar-emprendimiento.component.scss'
})
export class AgregarEmprendimientoComponent {
  objeto: Emprendimiento = new Emprendimiento();
  otro: string = "";
  mensajeId: string = '';
  mensajeUser: string = '';
  mensajeEmail: string = '';

  sociales: Social[] = [];
  socialTypes: string[] = ['Facebook', 'Instagram', 'Tiktok', 'Twitter', 'WebPage'];

  constructor(
    private service: EmprendimientoService,
    private provinciaService: ProvinciaService,
    private cantonService: CantonService,
    private distritoService: DistritoService,
    private adminsService: EmprendimientoAdminService, 
    private tiposService:TiposService,
    private socialService:SocialService,
    private cookieService: CookieService,  
    private route: Router,
    private rou: ActivatedRoute
  ) {
    this.getProvincias();
    this.objeto.IdType = "Fisica"
    this.tiposService.getList().subscribe({
      next:(data) =>{
        this.tipos = data
        console.log(this.tipos)
      }
    })

  }


  sonUnicos(sociales: Social[]): boolean {
    const tiposExistentes: Set<string> = new Set();
  
    for (const social of sociales) {
      if (tiposExistentes.has(social.Type)) {
        return false;
      }
      tiposExistentes.add(social.Type);
    }
  
    return true; 
  }

  addOtro() {
    if (this.sociales.length < 5) {
      const nuevoSocial = new Social();
      nuevoSocial.Type = "Facebook";
      nuevoSocial.Link = "";
      this.sociales.push(nuevoSocial);
    }
    console.log(this.sociales)
    console.log(this.sonUnicos(this.sociales))
  }
  

  provincias: Province[] = [];
  cantones: Canton[] = [];
  distritos: Distrito[] = [];
  tipos: Tipos[] = [];
  confirm = '';
  temp:EmprendimientoAdmin = new EmprendimientoAdmin;

  guardar() {
    if (!this.sonUnicos(this.sociales)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes redes sociales repetidas, revísalo antes de seguir',
      });
    } else {
      Swal.fire({
        title: "¿Quieres registrarte en Club Creativo como Emprendedor?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
            this.objeto.Reason = "";
            this.objeto.State = 'Pendiente';
            if (this.objeto.Type == "Otros"){
              this.objeto.Type = "Otros: " + this.otro
            }
            this.service.add(this.objeto).subscribe({
              next:(data) =>{
                this.temp.IdClient = this.cookieService.get("cookieCLIENTE");
                this.temp.IdEntrepreneurship = this.objeto.Username;
                this.temp.state = "Aceptado"
                this.adminsService.add(this.temp).subscribe({
                  next: (data) =>{

                    const observables = [];

                    for (const obj of this.sociales) {
                      obj.Username = this.objeto.Username;
                      // Añades cada subscripción a un array
                      observables.push(
                        this.socialService.add(obj)
                      );
                    }

                    // Utilizas forkJoin para esperar a que todas las subscripciones se completen
                    forkJoin(observables).subscribe(
                      () => {
                        // Este bloque se ejecuta cuando todas las subscripciones se completan con éxito
                        console.log("Todos los objetos han sido añadidos correctamente.");
                        this.service.successMessage("Registro exitoso", "/mis-emprendimientos");
                      },
                      (error) => {
                        // Este bloque se ejecuta si hay algún error en alguna de las subscripciones
                        console.error("Error al añadir objetos:", error);
                      }
                    );
                  }, error:(err) => {
                    console.log(err)
                    this.service.errorMessage(err.error.Message)
                  }
                })
              }, error:(err) =>{
                console.log(err)
                this.service.errorMessage(err.error.Message)
              }
            })
        }
      });
    }
  }
  checkAvailabilityId(){
    if (this.objeto.IdEntrepreneurship == null){
      this.mensajeId = ""
    } else {
      this.service.get("byId", this.objeto.IdEntrepreneurship).subscribe(
        () => { this.mensajeId = 'No disponible'; },
        () => { this.mensajeId = 'Disponible'; }
      );
    }
  }

  

  esCorreoValido(correo: string): boolean {
    const patron = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    return patron.test(correo);
  }

  checkAvailabilityEmail(){
    if (this.objeto.Email == ""){
      this.mensajeEmail = ""
    } else if(!this.esCorreoValido(this.objeto.Email)){
      this.mensajeEmail = 'No disponible'; 
    } else {
      this.service.get("byEmail", this.objeto.Email.replace(/\./g, '')).subscribe(
        () => { this.mensajeEmail = 'No disponible'; },
        () => { this.mensajeEmail = 'Disponible'; }
      );
    }
  }
  checkAvailabilityUser(){
    if (this.objeto.Username == ""){
      this.mensajeUser = ""
    } else {
      this.service.get("byUser", this.objeto.Username).subscribe(
        () => { this.mensajeUser = 'No disponible'; },
        () => { this.mensajeUser = 'Disponible'; }
      );
    }
  }



  selected() {
    this.getCantones();
    this.objeto.District = '';
  }

  selectedcant() {
    this.getDistritos();
  }

  getProvincias() {
    this.provinciaService.getList().subscribe({
      next: (data) => {
        this.provincias = data;
      },
    });
  }

  getCantones() {
    this.cantonService.getSelectedList(this.objeto.Province).subscribe({
      next: (data) => {
        this.cantones = data;
      },
    });
  }

  getDistritos() {
    this.distritoService.getSelectedList(this.objeto.Canton).subscribe({
      next: (data) => {
        this.distritos = data;
      },
    });
  }
  redirigir(url: string) {
    window.location.href = url;
  }


  formatoNumeros(event, cantidad) {
    const input = event.target.value;
    const formatted = input.replace(/[^0-9-]/g, '').slice(0, cantidad);
    event.target.value = formatted;
  }
}
