import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from 'src/app/services/role.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.scss'
})
export class Login2Component {
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private service: AuthService, 
    private _ngZone: NgZone
  ){

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
    try {
      // Decodificar el payload
      const decoded = jwtDecode(token);
  
      // Mostrar el payload completo
      console.log('Payload Decoded:', decoded);
  
      // Buscar valores específicos
      const email = this.findValueByKey(decoded, 'email');
      const family_name = this.findValueByKey(decoded, 'family_name');
      const given_name = this.findValueByKey(decoded, 'given_name');
  
      console.log('Email:', email);
      console.log('Family Name:', family_name);
      console.log('Given Name:', given_name);
  
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
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
