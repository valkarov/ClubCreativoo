import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-agency-one-testimonials',
    templateUrl: './agency-one-testimonials.component.html',
    styleUrls: ['./agency-one-testimonials.component.scss']
})
export class AgencyOneTestimonialsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
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