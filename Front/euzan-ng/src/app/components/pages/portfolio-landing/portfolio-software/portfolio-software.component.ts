import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-portfolio-software',
    templateUrl: './portfolio-software.component.html',
    styleUrls: ['./portfolio-software.component.scss']
})
export class PortfolioSoftwareComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}