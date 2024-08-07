import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-agency-two-case-study',
    templateUrl: './agency-two-case-study.component.html',
    styleUrls: ['./agency-two-case-study.component.scss']
})
export class AgencyTwoCaseStudyComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    caseStudySlides: OwlOptions = {
		loop: true,
		margin: 30,
		nav: false,
		dots: true,
		smartSpeed: 2000,
		stagePadding: 20,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
    }

}