import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sass-one-pricing',
    templateUrl: './sass-one-pricing.component.html',
    styleUrls: ['./sass-one-pricing.component.scss']
})
export class SassOnePricingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}