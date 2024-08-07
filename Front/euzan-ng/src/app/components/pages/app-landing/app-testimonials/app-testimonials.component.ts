import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-app-testimonials',
    templateUrl: './app-testimonials.component.html',
    styleUrls: ['./app-testimonials.component.scss']
})
export class AppTestimonialsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    testimonialSlides: OwlOptions = {
		loop: true,
		margin: 10,
		nav: true,
		navText:[
			"<i class='flaticon-left'></i>",
			"<i class='flaticon-right'></i>"
		],
		dots: false,
		smartSpeed: 2000,
		items: 1
    }

}