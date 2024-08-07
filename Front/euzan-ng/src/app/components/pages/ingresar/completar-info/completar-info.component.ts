import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Province, Canton, Distrito } from 'src/app/interfaces/lugares';
import { ClienteService } from 'src/app/services/cliente.service';
import { CantonService, DistritoService, ProvinciaService } from 'src/app/services/lugares.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completar-info',
  templateUrl: './completar-info.component.html',
  styleUrl: './completar-info.component.scss'
})
export class CompletarInfoComponent {
  objeto = new Cliente;
  mensajeId:string = "";
  mensajeUser:string = "";
  mensajeEmail:string = "";
  
  
  provincias: Province[] = [];
  cantones: Canton[] = [];
  distritos: Distrito[] = [];
  confirm = "";
  
  constructor(private service:ClienteService,
    private provinciaService: ProvinciaService,
    private cantonService: CantonService,
    private distritoService: DistritoService,
    private route: Router,
    private rou: ActivatedRoute
  ) {
    
    this.getProvincias();


    const navigation = this.route.getCurrentNavigation();
    const miObjetoString = navigation?.extras.state?.['miObjeto'];
    if (miObjetoString) {
      // Convertir de JSON
      const miObjeto = JSON.parse(miObjetoString);
      console.log('Objeto recibido:', miObjeto);

      this.objeto.Email = miObjeto.Email
      this.objeto.Password= 'null'
      this.confirm = 'null'
      this.objeto.LastName = miObjeto.LastName
      this.objeto.FirstName = miObjeto.FirstName
      this.objeto.Username = miObjeto.Email.split('@')[0].replace(/\./g, '');
    }


  }

  
  checkAvailabilityId(){
    if (this.objeto.IdClient == null){
      this.mensajeId = ""
    } else {
      this.service.get("byId", this.objeto.IdClient).subscribe(
        () => { this.mensajeId = 'No disponible'; },
        () => { this.mensajeId = 'Disponible'; }
      );
      console.log(this.mensajeId)
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
  
  
  guardar(){
    Swal.fire({
      title: "¿Quieres registrarte en Club Creativo como Cliente?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.confirm === this.objeto.Password) {
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
    console.log("leyendo provincias")
    this.provinciaService.getList().subscribe({
        next: (data) => {
          this.provincias= data;
          console.log(this.provincias)
        },
        error: (err) => {
          console.log(err)
        }
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

  formatoNumeros(event, cantidad) {
    const input = event.target.value;
    const formatted = input.replace(/[^0-9-]/g, '').slice(0, cantidad);
    event.target.value = formatted;
  }
  
  }
  