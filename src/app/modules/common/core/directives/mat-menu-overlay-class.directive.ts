import {Directive, Input} from "@angular/core";
import {MatMenu} from "@angular/material/menu";
import {NgChanges, TypedOnChanges} from "@common/core";

@Directive({
    selector: '[appMatMenuOverlayClass]'
})
export class MatMenuOverlayClassDirective implements TypedOnChanges {
    @Input('appMatMenuOverlayClass')
    public overlayClass!: string | string[];

    constructor(private readonly matMenu: MatMenu) {}

    public ngOnChanges(changes: NgChanges<this>) {
        if ('overlayClass' in changes) {
            this.matMenu.overlayPanelClass = this.overlayClass;
        }
    }
}
