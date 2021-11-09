import { Directive, DoCheck } from '@angular/core';
import { MatTabLink } from '@angular/material/tabs';
import { RouterLinkActive } from '@angular/router';

@Directive({
    selector: '[appMatTabRouterLink]'
})
export class MatTabRouterLinkDirective implements DoCheck {
    constructor(
        private readonly tabLink: MatTabLink,
        private readonly routerLinkActive: RouterLinkActive
    ) {
        this.updateTabActive();
    }

    public ngDoCheck(): void {
        this.updateTabActive();
    }

    private updateTabActive(): void {
        this.tabLink.active = this.routerLinkActive.isActive;
    }
}
