import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidenav-link',
    templateUrl: './sidenav-link.component.html'
})
export class SidenavLinkComponent {
    @Input()
    public title!: string;

    @Input()
    public link!: string;
}
