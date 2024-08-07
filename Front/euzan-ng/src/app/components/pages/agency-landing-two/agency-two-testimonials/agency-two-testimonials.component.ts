import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-agency-two-testimonials',
    templateUrl: './agency-two-testimonials.component.html',
    styleUrls: ['./agency-two-testimonials.component.scss']
})
export class AgencyTwoTestimonialsComponent implements OnInit {

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