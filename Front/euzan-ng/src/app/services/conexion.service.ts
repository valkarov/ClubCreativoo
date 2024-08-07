import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export abstract class ConexionService<T> {

  constructor(protected httpClient: HttpClient, protected route: Router) {
  }


  abstract getResourceURL(): string;
  abstract getHomePage(id?: string | number, id2?: string | number): string;
  abstract getNombre(): string;


  getRuta() {
    return "https://localhost:44301/api" + this.getResourceURL();
  }

  getList() {
    return this.httpClient.get<T[]>(this.getRuta());
  }
  getSelectedList(atributo: string) {
    return this.httpClient.get<T[]>(this.getRuta() + "/" + atributo);
  }

  get(id: string | number, id2?: string|number) {
    
    if (id2){
      id = id + "/" + id2
    }
    console.log(this.getRuta()+ "/" + id)
    return this.httpClient.get<T>(this.getRuta() + "/" + id);
  }

  add(resource: T, id?: string|number): Observable<T> {
    if (id){
      return this.httpClient.post<T>(this.getRuta() + "/" + id, resource);
    }
    return this.httpClient.post<T>(this.getRuta(), resource);
  }
  
  onNuevoParam(resource:T, ruta:string): Observable<T> {
    return this.httpClient.post<T>(this.getRuta() + "/" + ruta, resource);
  }

  update(id:number | string, resource: T): Observable<T> {
    return this.httpClient.put<T>(this.getRuta()+ "/" + id, resource);
  }

  delete(id: string | number) {
    return this.httpClient.delete<T[]>(this.getRuta() + "/" + id);
  }


  errorMessage(mensaje:string){
    Swal.fire({
      title: "Ha habido un problema!",
      text: mensaje,
      icon: "error",
    });
  }
  successMessage(mensaje:string, url:string){
    Swal.fire({
      title: mensaje,
      icon: "success",
      didClose: () => {
        window.location.href = url;
      }
    });
  }
  subMessage(mensaje:string, sub:string, url:string){
    Swal.fire({
      title: mensaje,
      text: sub,
      icon: "success",
      didClose: () => {
        window.location.href = url;
      }
    });
  }


  onEliminar(id:string | number, id2?: string|number, recargar?:boolean){
    if (id2){
      id = id + "/" + id2
    }
    this.delete(id).subscribe({
      next:(data)=>{
        if (recargar==undefined){
        this.route.navigate([this.getHomePage()])}},
        error: (err) =>{
          console.log(err)
        } 
    })
  }



  onNuevo(objeto:T, nombre:string | number,  recargar?:boolean){
    console.log(objeto)
    this.add(objeto).subscribe({
      
      next: (data) => {
        if (recargar==undefined){
          this.route.navigate([this.getHomePage()])}
          return true
      },
      error: (err) =>{
        return false
        }
    })
  }

  onCancelar(){
    this.route.navigate([this.getHomePage()])
  }
}
