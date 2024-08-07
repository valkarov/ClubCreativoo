import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-app-screenshots',
    templateUrl: './app-screenshots.component.html',
    styleUrls: ['./app-screenshots.component.scss']
})
export class AppScreenshotsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    screenshotSlider: OwlOptions = {
		loop: true,
		margin: 30,
		nav: false,
		dots: true,
		center: true,
		smartSpeed: 2000,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			768: {
				items: 2
			},
			1000: {
				items: 5
			}
		}
    }

}