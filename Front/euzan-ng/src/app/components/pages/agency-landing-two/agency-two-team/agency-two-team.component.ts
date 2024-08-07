import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-agency-two-team',
    templateUrl: './agency-two-team.component.html',
    styleUrls: ['./agency-two-team.component.scss']
})
export class AgencyTwoTeamComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    teamSlides: OwlOptions = {
		loop: true,
		margin: 30,
		nav: false,
		dots: true,
		smartSpeed: 2000,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 4
			}
		}
    }

}