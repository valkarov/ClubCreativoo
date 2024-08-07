import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-app-how-to-use',
    templateUrl: './app-how-to-use.component.html',
    styleUrls: ['./app-how-to-use.component.scss']
})
export class AppHowToUseComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    howToUseSlider: OwlOptions = {
		loop:true,
		margin:10,
		nav:false,
		dots:true,
		center:true,
		smartSpeed:2000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			992:{
				items:1
			}
		}
    }

}