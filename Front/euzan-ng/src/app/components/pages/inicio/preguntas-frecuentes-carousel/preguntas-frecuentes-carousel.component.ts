import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-preguntas-frecuentes-carousel',
  templateUrl: './preguntas-frecuentes-carousel.component.html',
  styleUrl: './preguntas-frecuentes-carousel.component.scss'
})
export class PreguntasFrecuentesCarouselComponent implements OnInit {

  preguntas:Pregunta[] = []

  constructor(private service: PreguntasService){

  }

  ngOnInit(): void {
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

  testimonialWrapperSlides: OwlOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  smartSpeed: 2000,
  items: 1,
  navText:[
    "<i class='flaticon-left'></i>",
    "<i class='flaticon-right'></i>"
  ],
  }

}