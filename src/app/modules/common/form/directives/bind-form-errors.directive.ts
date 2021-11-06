import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BindControlErrorDirective } from './bind-control-error.directive';

@Directive({
    selector: '[appBindFormErrors]'
})
export class BindFormErrorsDirective implements AfterViewInit {
    @Input()
    public formGroup!: FormGroup;

    @ContentChildren(BindControlErrorDirective, { descendants: true })
    private readonly controlsQuery!: QueryList<BindControlErrorDirective>;

    public ngAfterViewInit(): void {
        this.controlsQuery.forEach((control) => control.bindControl(this.formGroup));
    }
}
