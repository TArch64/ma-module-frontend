import {Directive, Input, OnDestroy, Renderer2, ViewContainerRef} from '@angular/core';
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

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly renderer: Renderer2
    ) {}

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
        const nativeElement = this.viewContainerRef.element.nativeElement;
        const message = this.control.errors?.message as string ?? '';
        this.renderer.setProperty(nativeElement, 'innerText', message)
    }
}
