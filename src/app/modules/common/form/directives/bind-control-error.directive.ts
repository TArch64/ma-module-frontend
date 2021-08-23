import {Directive, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {Disposable} from "@common/core";

@Directive({
    selector: '[appBindControlError]',
})
export class BindControlErrorDirective implements OnDestroy {
    @Input('appBindControlError')
    public controlName!: string;
    private control!: AbstractControl;
    private readonly disposable = new Disposable();

    constructor(private readonly viewContainerRef: ViewContainerRef) {}

    public ngOnDestroy(): void {
        this.disposable.dispose();
    }

    public bindControl(form: FormGroup): void {
        this.control = form.get(this.controlName)!!;
        if (!this.control) throw new Error(`Undefined control with name: "${this.controlName}"`);
        this.disposable.subscribeTo(this.control.statusChanges, this.renderError.bind(this));
        this.renderError();
    }

    private renderError(): void {
        const nativeElement = this.viewContainerRef.element.nativeElement as HTMLElement;
        nativeElement.innerHTML = this.control.errors?.message as string ?? '';
    }
}
