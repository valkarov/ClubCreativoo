import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sass-two-pricing',
    templateUrl: './sass-two-pricing.component.html',
    styleUrls: ['./sass-two-pricing.component.scss']
})
export class SassTwoPricingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}