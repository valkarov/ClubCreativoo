import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Province, Canton, Distrito } from 'src/app/interfaces/lugares';
import { Repartidor } from 'src/app/interfaces/repartidor';
import { ProvinciaService, CantonService, DistritoService } from 'src/app/services/lugares.service';
import { RepartidorService } from 'src/app/services/repartidor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-repartidor',
  templateUrl: './nuevo-repartidor.component.html',
  styleUrl: './nuevo-repartidor.component.scss'
})
export class NuevoRepartidorComponent {
  objeto = new Repartidor();
  
  constructor(private service:RepartidorService,
    private provinciaService: ProvinciaService,
    private cantonService: CantonService,
    private distritoService: DistritoService,
    private route: Router,
    private rou: ActivatedRoute
  ) {
    this.getProvincias();
  }
  
  provincias: Province[] = [];
    cantones: Canton[] = [];
    distritos: Distrito[] = [];
    confirm = "";

    mensajeId:string = "";
    mensajeUser:string = "";
    mensajeEmail:string = "";
  
  
  
    guardar() {
      Swal.fire({
        title: "¿Quieres registrarte en Club Creativo como Repartidor?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.confirm === this.objeto.Password) {
            console.log(this.objeto)
            this.objeto.State = 'Disponible';
            this.service.add(this.objeto).subscribe({
              next:(data) =>{
                this.service.successMessage("Registro exitoso", "/ingresar");
              }, error:(err) =>{
                console.log(err)
                this.service.errorMessage(err.error.Message)
              }
            })
          } else {
            this.service.errorMessage("Las contraseñas no coinciden")
          }
        }
      });
    }
  
  selected() {
    this.getCantones();
    this.objeto.District ="";
  }
  
  selectedcant() {
    this.getDistritos();
  }
  
  getProvincias() {
    this.provinciaService.getList().subscribe({
        next: (data) => {
          this.provincias= data;
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
  
  redirigir(url:string) {
    window.location.href = url;
  }

  checkAvailabilityId(){
    if (this.objeto.IdDeliveryPerson == null){
      this.mensajeId = ""
    } else {
      this.service.get("byId", this.objeto.IdDeliveryPerson).subscribe(
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

  formatoNumeros(event, cantidad) {
    const input = event.target.value;
    const formatted = input.replace(/[^0-9-]/g, '').slice(0, cantidad);
    event.target.value = formatted;
  }
  
  
  }
  