import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CredentialResponse } from 'google-one-tap';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/interfaces/role';
import { TempPass } from 'src/app/interfaces/temp_pass';
import { RoleService } from 'src/app/services/role.service';
import { TempPassService } from 'src/app/services/temp-pass.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './ingresar.component.html',
  styleUrl: './ingresar.component.scss'
})
export class IngresarComponent {
  usuario:string="";
  pass:string="";
  rol:Role = new Role;
  error:boolean = false;
  
  unregistered = true;
  errorMessage:string = "";
  temp:TempPass = new TempPass();

  constructor(
    private service:RoleService, 
    private cookieService: CookieService, 
    private tempService:TempPassService
    ){
    if (cookieService.get("cookieADMIN") !="") {
      this.redirigir("/dashboard-admin")
    } else if (cookieService.get("cookieEMPRENDIMIENTO") !="") {
      this.redirigir("/dashboard-emprendimiento")
    } else if (cookieService.get("cookieCLIENTE") !="") {
      this.redirigir("/dashboard-cliente")
    } else if (cookieService.get("cookieREPARTIDOR") !="") {
      this.redirigir("/dashboard-repartidor")
    }

  }

  redirigir(url:string) {
    window.location.href = url;
  }

  eliminarTemp(username){
    this.tempService.delete(username).subscribe({
      next: (data) => {this.tempService.successMessage("Solicitud cancelada", "/ingresar")}, 
      error: (err) => {this.tempService.errorMessage(err.error.Message)} 
    })
  }

  Ingresar(){
    if (this.usuario != "" && this.pass != "") {
      this.service.get(this.usuario, this.pass).subscribe({
        next:(data) => {
          this.error = false
          this.rol = data
          console.log(this.rol)
          this.cookieService.set('cookie' + this.rol.Type, this.rol.Username);
          this.service.successMessage("¡Bienvenido a tu cuenta!", "/ingresar")
        }, 
        error:(err) => {
          this.error = true
          this.errorMessage = err.error.Message
        }
      })
    }
    this.error = true
    this.errorMessage = "Completa los espacios en blanco"
  }

  async recuperar() {
    // Pedir el nombre de usuario
    const { value: username } = await Swal.fire({
      title: 'Ingrese su nombre de usuario',
      input: 'text',
      inputPlaceholder: 'Nombre de usuario',
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('¡Necesitas escribir algo!');
          } else {
            this.temp.Username = value;
            this.tempService.add(this.temp).subscribe({
              next: (data) => {
                this.temp = data;
                resolve();
              },
              error: (err) => {
                console.log(err);
                resolve(`
                  ${err.error.Message}
                  <br>
                  <button id="cancel-request" class="swal2-cancel swal2-styled" style="display: inline-block; margin-top: 10px;">
                    ¿Cancelar la solicitud?
                  </button>
                `);
    
                // Añadir el evento al botón después de que el Swal se haya mostrado
                setTimeout(() => {
                  const cancelButton = document.getElementById('cancel-request');
                  if (cancelButton) {
                    cancelButton.addEventListener('click', () => {
                      this.eliminarTemp(this.temp.Username);
                      Swal.close();
                    });
                  }
                }, 0);
              }
            });
          }
        });
      }
    });
    
  
    // Verificar si se obtuvo correctamente el nombre de usuario
    if (username) {
      // Pedir el PIN

      const hiddenEmail = this.getObfuscatedEmail(this.temp.Email);
      const { value: pin } = await Swal.fire({
        title: 'Ingrese su PIN',
        input: 'number',
        inputPlaceholder: 'PIN',
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        html: `<p>Hemos enviado el PIN al correo: ${hiddenEmail}</p>`, 
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve('¡Necesitas ingresar un PIN!');
            } else if (parseInt(value) !== this.temp.Pin) {
              resolve('PIN incorrecto.'); // Si el PIN no coincide con this.temp.Pin
            } else {
              console.log("PIN correcto."); // Aquí puedes agregar lógica adicional si el PIN es correcto
              resolve(); // Resolver la promesa si el PIN es válido
            }
          });
        }
      });
  
      // Continuar con el flujo si se proporcionó un PIN válido
      if (pin) {
        // Aquí puedes continuar con lo que necesites hacer después de validar el PIN
        console.log('Usuario validado y PIN ingresado correctamente.');

        // Aquí puedes proceder a pedir una nueva contraseña
      const { value: newPassword } = await Swal.fire({
        title: 'Ingrese su nueva contraseña',
        input: 'password',
        inputPlaceholder: 'Nueva contraseña',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return '¡Necesitas ingresar una nueva contraseña!';
          } else {
            this.temp.NewPass = value;
            this.temp.State = "Autorizado";
            console.log('Nueva contraseña guardada:', value);
            this.tempService.update(this.temp.Username, this.temp).subscribe({
              next:(data)  =>(this.service.successMessage("Contraseña Cambiada con éxito", "/ingresar")),
              error:(data) => (this.service.errorMessage("Algo ha salido mal, intenta de nuevo en unos minutos"))
            })
          }
        }
      });
      }
    }
  }


  getObfuscatedEmail(email) {
    const atIndex = email.indexOf('@');
    const localPart = email.substring(0, atIndex);
    const domain = email.substring(atIndex);
    const obfuscatedLocalPart = localPart.substring(0, 2) + '*'.repeat(localPart.length - 2);
    return obfuscatedLocalPart + domain;
}  

ngOnInit(): void {
  // @ts-ignore
  window.onGoogleLibraryLoad = () =>{
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '112167849332-2e52g3r0sljruhhv7o1s6mpesce9uvbs.apps.googleusercontent.com', 
      callback: this.handleCredentialResponse.bind(this), 
      auto_select:false, 
      cancel_on_tap_outside: true
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"), 
      {theme: "outline", size:"large", width: 100}
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {})
  }
}


async handleCredentialResponse(response: CredentialResponse){
  console.log(response.credential)
  this.decodeJWT(response.credential)
}


decodeJWT(token) {
  // Decodificar el payload
  const decoded = jwtDecode(token);

  // Mostrar el payload completo
  console.log('Payload Decoded:', decoded);

  // Buscar valores específicos
  const email = this.findValueByKey(decoded, 'email');
  const family_name = this.findValueByKey(decoded, 'family_name');
  const given_name = this.findValueByKey(decoded, 'given_name');

  const user = email.split('@')[0].replace(/\./g, '');

  this.service.get("Google", user).subscribe({
    next:(data) => {
      this.error = false
      this.rol = data
      console.log(this.rol)
      this.cookieService.set('cookie' + this.rol.Type, this.rol.Username);
      this.service.successMessage("¡Bienvenido a tu cuenta!", "/ingresar")
    }, 
    error:(err) => {
      console.log(err)
      console.log(err.error.Message)
      this.service.errorMessage("Cuenta de Google no registrada")
    }
  })
}


findValueByKey(obj, keyToFind) {
  let result = 'No value found';

  for (const key in obj) {
    if (key.toLowerCase() === keyToFind.toLowerCase()) {
      result = obj[key];
      break;
    } else if (typeof obj[key] === 'object') {
      result = this.findValueByKey(obj[key], keyToFind);
      if (result !== 'No value found') {
        break;
      }
    }
  }

  return result;
}


}
