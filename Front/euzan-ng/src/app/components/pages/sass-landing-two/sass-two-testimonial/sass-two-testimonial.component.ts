import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-sass-two-testimonial',
    templateUrl: './sass-two-testimonial.component.html',
    styleUrls: ['./sass-two-testimonial.component.scss']
})
export class SassTwoTestimonialComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    testimonialSlider: OwlOptions = {
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