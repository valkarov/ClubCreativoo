import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros-banner',
  templateUrl: './sobre-nosotros-banner.component.html',
  styleUrl: './sobre-nosotros-banner.component.scss'
})
export class SobreNosotrosBannerComponent {
  constructor(private viewportScroller: ViewportScroller,){}

  public onClick(mainpage:string, elementId: string): void { 
    const currentPath = window.location.pathname;
    if (currentPath != mainpage) {
      this.redirigir(mainpage)
    }
      this.viewportScroller.scrollToAnchor(elementId);
  }

  redirigir(url:string) {
    window.location.href = url;
  }

}
