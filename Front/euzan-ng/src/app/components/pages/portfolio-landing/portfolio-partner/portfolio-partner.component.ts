import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-portfolio-partner',
    templateUrl: './portfolio-partner.component.html',
    styleUrls: ['./portfolio-partner.component.scss']
})
export class PortfolioPartnerComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    companySlides: OwlOptions = {
		loop: true,
		margin: 10,
		nav: false,
		dots: false,
		smartSpeed: 2000,
		autoplay: true,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
    }

}