import { Directive } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Directive({
    selector: '[appMatDisabledButton]',
    exportAs: 'appMatDisabledButton'
})
export class MatDisabledButtonDirective {
    constructor(private readonly matButton: MatButton) {}

    public disable(): void {
        this.matButton.disabled = true;
    }

    public disableForTime(ms: number): void {
        this.disable();
        setTimeout(this.enable.bind(this), ms);
    }

    public enable(): void {
        this.matButton.disabled = false;
    }
}
