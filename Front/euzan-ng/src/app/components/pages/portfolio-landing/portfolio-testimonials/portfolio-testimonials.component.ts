import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-portfolio-testimonials',
    templateUrl: './portfolio-testimonials.component.html',
    styleUrls: ['./portfolio-testimonials.component.scss']
})
export class PortfolioTestimonialsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    testimonialTextSlides: OwlOptions = {
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