import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-app-pricing',
    templateUrl: './app-pricing.component.html',
    styleUrls: ['./app-pricing.component.scss']
})
export class AppPricingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}