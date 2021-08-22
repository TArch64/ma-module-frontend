import {AfterViewInit, Directive, Input} from "@angular/core";
import {MatMenu} from "@angular/material/menu";

@Directive({
    selector: '[appMatMenuOverlayClass]'
})
export class MatMenuOverlayClass implements AfterViewInit {
    @Input('appMatMenuOverlayClass')
    public overlayClass!: string | string[];

    constructor(private readonly matMenu: MatMenu) {}

    public ngAfterViewInit() {
        this.matMenu.overlayPanelClass = this.overlayClass;
    }
}
